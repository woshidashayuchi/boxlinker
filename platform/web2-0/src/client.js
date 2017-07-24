
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import App from './components/App';
import configureStore from './store/configureStore';
import { createPath } from 'history/PathUtils';
import history from './core/history';
import queryString from 'query-string';
import { ErrorReporter, deepForceUpdate, windowScrollX,windowScrollY} from './core/devUtils';
import {CONSOLE_LOG} from './constants';
import {offConsole} from './core/utils';

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  store: configureStore(window.APP_STATE, { history })
}

function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}
function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}
function updateCustomMeta(property, content) { // eslint-disable-line no-unused-vars
  updateTag('meta', 'property', property, 'content', content);
}
function updateLink(rel, href) { // eslint-disable-line no-unused-vars
  updateTag('link', 'rel', rel, 'href', href);
}

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    updateMeta('description', route.description);

  }
};

FastClick.attach(document.body);

const container = document.getElementById('app');
let appInstance;
let currentLocation = history.location;
let routes = require('./routes').default;

CONSOLE_LOG?offConsole():null;//禁止console.log

async function onLocationChange(location) {
  currentLocation = location;
  try{
    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    appInstance = ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location),
    );
    if (location && location.scrollY !== undefined) {
      window.scrollTo(location.scrollX, location.scrollY);
    } else {
      window.scrollTo(0, 0);
    }
  } catch(error) {
    console.error(error);
    // Current url has been changed during navigation process, do nothing
    if (currentLocation.key !== location.key) {
      return;
    }

    // Display the error in full-screen for development mode
    if (process.env.NODE_ENV !== 'production') {
      appInstance = null;
      document.title = `Error: ${error.message}`;
      ReactDOM.render(<ErrorReporter error={error} />, container);
      return;
    }

    // Avoid broken navigation in production mode by a full page reload on error
    window.location.reload();
  }
}

history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require('./routes').default; // eslint-disable-line global-require

    if (appInstance) {
      try {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      } catch (error) {
        appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }
    }

    onLocationChange(currentLocation);
  });
}
