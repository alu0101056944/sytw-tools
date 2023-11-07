
const { src, dest, task } = require('gulp');

task('default', async () => {
  src('app/styles/bar.css').pipe(dest('app/styles/concatenated.css'));
});
