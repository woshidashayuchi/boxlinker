/***
 *
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';

process.argv.push('--watch');

const [config] = webpackConfig;

async function start(){
  console.log('start...')
  await run(clean)
  await run(copy)
  await new Promise(resolve => {
    if (config.debug) {
      config.entry.client = ['react-hot-loader/patch', 'webpack-hot-middleware/client']
        .concat(config.entry.client);
      config.output.filename = config.output.filename.replace('[chunkhash', '[hash');
      config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash', '[hash');
      config.module.loaders.find(x => x.loader === 'babel-loader')
        .query.plugins.unshift('react-hot-loader/babel');
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());
    }
    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: config.output.publicPath,
      stats: config.stats,
    });
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();

      bs.init({
        ...(config.debug ? {} : { notify: false, ui: false }),

        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };

    bundler.plugin('done', stats => handleBundleComplete(stats));

  })
}

export default start;
