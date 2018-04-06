import {
  remove,
  task,
  exec,
  run,
  copy,
  zip,
} from '@miljan/build/lib/index.js'
//                   ^-- remove /lib/index.js soon(ish)
//                       once it won't break when building without it.

run(async () => {
  await remove('dist')

  // build
  await task('Build UI', () => exec('yarn build', {
    cwd: 'packages/ui',
  }))

  // package
  await Promise.all([
    copy('packages/ui/lib/**.js', 'dist/ui'),
  ])

  await zip('dist/ui', `dist/ui.zip`)
  await remove('dist/pkg')
})
