import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import replaceInFile from 'replace-in-file'

import {
  run,
  task,
  remove,
  write,
} from '@miljan/build/lib/index.js'
//                   ^-- remove /lib/index.js soon(ish)
//                       once it won't break when building without it.

run(async () => {
  await remove('lib')

  const components = await globby('src/components/*')

  await task('Compile Library', async () => {
    return Promise.all(components.map(async input => {
      const basename = path.dirname(input).split('/').pop()
      return compile(input, `lib/${basename}.js`)
    }))
  })

  /*
  await replaceInFile({
    files: 'lib/ * / * .js',
    from: /ui\/src/g,
    to: '..',
  })
  */

  await replaceInFile({
    files: 'lib/*.js',
    from: /ui\/src/g,
    to: '.',
  })
})

async function compile (input, dest, opts = {}) {
  const config = {
    input,
    output: {
      format: 'es',
    },
    external: opts.external || (id => {
      const isRelative = /\.\//

      if (id === input || isRelative.test(id)) {
        return false
      }

      const dirname = path.dirname(input)
      const isInternal = RegExp(`${dirname}/`)

      return !isInternal.test(id) // eslint-disable-line
    }),
    plugins: [
      buble(),
      cleanup(),
    ],
  }

  const {
    code,
  } = await rollup(config)
  await write(dest, code, {
    log: true,
  })
}
