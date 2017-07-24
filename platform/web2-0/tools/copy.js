
import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';
import { format } from './run';

async function copy() {
  await makeDir('build')
  await Promise.all([
    writeFile('build/package.json',JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js'
      }
    }, null, 2)),
    copyDir('public', 'build/public'),
  ])
  if(process.argv.includes('--watch')){
    const watcher = chokidar.watch([
      'build/public/**/*'
    ], {ignoreInitial: true})
    watcher.on('all', async (event, filepath) => {
      const start = new Date()
      const src = path.relative('./', filepath)
      const dist = path.join('build/', src.startsWith('src')? path.relative('src', src): src )
      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.log(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
    })
  }
}

export default copy;
