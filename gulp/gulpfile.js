
const { src, dest, task, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-dart-sass');
const del = require('del');

function cleanup(done) {
  del(['app/styles/main.css']);
  done();
}

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

async function reload() {
  return browserSync.reload();
}

exports.default = function(done) {
  browserSync.init({
        server: {
          baseDir: './app/',
        }
      });

  watch('app/styles/*.scss',  { ignoreInitial: false }, compileSass);
  watch(['app/styles/*.css', '!app/styles/main.css'],
      { ignoreInitial: false }, series(cleanup, processCss, reload));

  done();
};
