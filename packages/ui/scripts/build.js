import rollup from './util/rollup'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'
import nodeResolve from 'rollup-plugin-node-resolve'

import {
  run,
  remove,
  write,
  task,
  minifyJS,
} from '@miljan/build/lib/index.js'
//                   ^-- remove /lib/index.js soon(ish)
//                       once it won't break when building without it.

run(async () => {
  await remove('dist')

  await task('Compile JS', async () => {
    // compile ES index
    await compile({
      input: 'src/ui.esm.js',
      output: {
        format: 'es',
      },
    }, 'dist/ui.esm.js')

    // compile CJS index
    await compile({
      input: 'src/ui.cjs.js',
      output: {
        format: 'cjs',
      },
    }, 'dist/ui.cjs.js')

    // compile dist as UMD
    await compile({
      input: 'src/ui.cjs.js',
      output: {
        name: 'ui',
        format: 'umd',
      },
      env: 'development',
    }, 'dist/ui.js')

    // compile dist as UMD for production
    await compile({
      input: 'src/ui.cjs.js',
      output: {
        name: 'ui',
        format: 'umd',
      },
      env: 'production',
    }, 'dist/ui.min.js')

    await minifyJS({
      src: 'dist/ui.min.js',
      options: {
        sourceMap: true,
        output: {
          ascii_only: true,
        },
        compress: {
          pure_funcs: ['makeMap'],
        },
      },
    })
  })
})

async function compile (opts, dest) {
  const config = {
    input: opts.input,
    output: opts.output,
    format: opts.format,
    external: opts.external,
    plugins: [
      nodeResolve({
        extensions: [ '.js',
          '.json' ],
      }),
      buble(),
      cleanup(),
    ],
  }

  if (opts.env) {
    config.plugins.push(replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }))
  }

  const {
    code,
  } = await rollup(config)
  await write(`${dest}`, code, {
    log: true,
  })
}
