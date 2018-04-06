import pkg from '../package.json'
import {
  run,
  banner,
} from '@miljan/build/lib/index.js'
//                   ^-- remove /lib/index.js soon(ish)
//                       once it won't break when building without it.

const year = (new Date()).getFullYear()

const Copyright = `/**
 * ${pkg.name} ${pkg.version}
 * (c) ${year} ${pkg.author}
 * @license ${pkg.license}
 **/
`

run(async () => {
  await banner('{dist,lib}/**/*.js', Copyright)
})
