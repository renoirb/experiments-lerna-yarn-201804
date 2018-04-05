import pkg from '../package.json'
import { run, banner } from '@miljan/build'
const year = (new Date).getFullYear()

const Copyright = `/**
 * Library ${pkg.version}
 * (c) ${year} ${pkg.author.name}
 * @license ${pkg.license}
 **/
`

run(async () => {
  await banner('{dist,lib}/**/*.js', Copyright)
})
