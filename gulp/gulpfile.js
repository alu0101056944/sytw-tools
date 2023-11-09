
const { src, dest, task, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();

const gulpSass = require('gulp-dart-sass');

task('compilesass', () => {
  return src('app/styles/*.scss')
      .pipe(gulpSass
          .sync({ outputStyle: 'compressed' }) // faster than async
          .on('error', gulpSass.logError))
      .pipe(dest('app/styles'));
});

function processCSS() {
  return src('./app/styles/*.css')
      .pipe(concatCss('main.css'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(dest('app/styles'));
}

task('activate-browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'app',
    }
  });
});

task('default', series('compilesass', processCSS, 'activate-browser-sync'));

watch('app/styles/*.*').on('change', browserSync);
