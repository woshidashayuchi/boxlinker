

import {cleanDir} from './lib/fs';

function clean() {
    return Promise.all([
        cleanDir('build/*',{
            nosort: true,
            dot: true,
            ignore: ['build/.git','build/public'],
        }),
        cleanDir('build/public', {
            nosort: true,
            dot: true,
            ignore: ['build/public/.git'],
        })
    ])
}

export default clean
