import {
  run,
  banner,
} from '@miljan/build'
const year = (new Date()).getFullYear()

const Copyright = `/**
 * Experiment ${pkg.version}
 * (c) ${year} ${pkg.author}
 * @license ${pkg.license}
 **/
`

run(async () => {
  await banner('{dist,lib}/**/*.js', Copyright)
})
