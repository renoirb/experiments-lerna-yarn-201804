import {
  remove,
  task,
  exec,
  run,
  copy,
  zip,
} from '@miljan/build'

run(async () => {
  await remove('dist')

  // build
  await task('Build UI', () => exec('yarn build', {
    cwd: 'packages/ui',
  }))

  // package
  await Promise.all([
    copy('packages/ui/dist/ui.js', 'dist/pkg'),
    copy('packages/ui/dist/ui.min.js', 'dist/pkg'),
    copy('packages/ui/dist/ui.min.js.map', 'dist/pkg'),
  ])

  await zip('dist/pkg', `dist/ui.zip`)
  await remove('dist/pkg')
})
