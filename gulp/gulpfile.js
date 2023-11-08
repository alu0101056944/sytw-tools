
const { src, dest, task, series } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCsss = require('gulp-minify-css');

const gulpSass = require('gulp-dart-sass');

task('compilesass', () => {
  return src('app/styles/*.scss')
      .pipe(gulpSass
          .sync({ outputStyle: 'compressed' }) // faster than async
          .on('error', gulpSass.logError))
      .pipe(dest('app/styles'));
});

task('default', series('compilesass', () => {
  return src('./app/styles/*.css')
      .pipe(concatCss('concatenated.css'))
      .pipe(minifyCsss())
      .pipe(dest('app/styles'));
}));
