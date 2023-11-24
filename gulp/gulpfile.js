
const { src, dest, task, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();

const gulpSass = require('gulp-dart-sass');

task('compilesass', (done) => {
      src('app/styles/*.scss')
          .pipe(gulpSass
              .sync({ outputStyle: 'compressed' }) // faster than async
              .on('error', gulpSass.logError))
          .pipe(dest('app/styles'));
      done();
    });

task('processCss', (done) => {
      src('./app/styles/*.css')
            .pipe(concatCss('main.css'))
            .pipe(sourcemaps.init())
            .pipe(minifyCss())
            .pipe(sourcemaps.write())
            .pipe(dest('app/styles'));
      done();
    });

task('activate-browser-sync', (done) => {
      browserSync.init({
        server: {
          baseDir: './app/',
        }
      });
      done();
    });

task('default', series('compilesass', 'processCss', 'activate-browser-sync'));

watch('app/styles/*', { delay: 1000 }, series('compilesass', 'processCss', browserSync.reload));
