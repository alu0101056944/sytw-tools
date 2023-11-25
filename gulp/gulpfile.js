
const { src, dest, task, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-dart-sass');

function compileSass(done) {
  src('app/styles/*.scss')
      .pipe(gulpSass
          .sync({ outputStyle: 'compressed' }) // faster than async
          .on('error', gulpSass.logError))
      .pipe(dest('app/styles'));

  done();
};

function processCss(done) {
  src(['./app/styles/*.css', '!./app/styles/main.css'])
      .pipe(concatCss('main.css'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(dest('app/styles'))
      .pipe(browserSync.stream());

  done();
};

exports.default = function() {
  browserSync.init({
        server: {
          baseDir: './app/',
        }
      });

  watch('app/styles/*.scss', compileSass);
  watch('app/styles/*.css', series(processCss, browserSync.reload));
};
