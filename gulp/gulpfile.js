
const { src, dest, task } = require('gulp');

const concatCss = require('gulp-concat-css');

task('default', async () => {
  await src('./app/styles/*.css')
      .pipe(concatCss('concatenated.css'))
      .pipe(dest('app/styles'));
});
