
import 'babel-polyfill'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import UniversalRouter from 'universal-router';
import routes from './routes';
import { port, auth } from './config';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './components/App';
import Html from './components/Html';
import assets from './assets';
import { fetchToken,fetchUserInfo ,fetchGetOauth} from './actions/users';
import {fetchGetOrganizeDetailAction} from './actions/organize';
import {toggleSidebarAction,onChangeSidebarActiveAction} from './actions/toggleSidebar';
import {HOSTNAME} from './constants';
const app = express();

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy')
}

app.get('*', async (req, res, next) => {
  try{
    const store = configureStore({
      user: req.user || null,
    }, {
      cookie: req.headers.cookie,
    });
    const token = req.cookies["_at"];
    if ((!token||token == 'null')) {
      console.log('no token.');
      res.redirect(HOSTNAME.LOGIN);
      return;
    }
    console.log('token:>',token);
    if (!!token){
      await store.dispatch(fetchToken(token));
      let user_uuid = store.getState().token.user_uuid;
      let organizeId = store.getState().token.team_uuid;
      await store.dispatch(fetchUserInfo(user_uuid,token));
      await store.dispatch(fetchGetOrganizeDetailAction(organizeId,token));
      await store.dispatch(fetchGetOauth(token));
      if (!store.getState().user_info){
        res.clearCookie("_at",{path:"/",domain:HOSTNAME.COOKIE});
        res.redirect(HOSTNAME.LOGIN);
        return
      }
    }
    // store.dispatch(setRuntimeVariable({
    //   name: 'initialNow',
    //   value: Date.now(),
    // }));
    store.dispatch(toggleSidebarAction(req.cookies["isSidebarOpen"] == "true"));
    store.dispatch(onChangeSidebarActiveAction(req.cookies["sidebarActive"]||"/"));
    const css = new Set();

    const context = {
      insertCss: (...styles) => {
        styles.forEach(style => css.add(style._getCss()));
      },
      store,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });
    if(route.chunk == 'dashboard'){
      store.dispatch(onChangeSidebarActiveAction('/'));
    }
    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    data.state = context.store.getState();

    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);

  } catch (err) {
    // res.sendfile('public/error.html');
    next(err)
  }
})

app.listen(port,() => {
  console.log(`The server is running at http://localhost:${port}/`);
})
