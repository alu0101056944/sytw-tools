
const { src, dest, task, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();

const gulpSass = require('gulp-dart-sass');

task('compilesass', () => {
  console.log('called compilesass task');
  return src('app/styles/*.scss')
      .pipe(gulpSass
          .sync({ outputStyle: 'compressed' }) // faster than async
          .on('error', gulpSass.logError))
      .pipe(dest('app/styles'));
});

function processCSS() {
  console.log('called process css task');
  return src('./app/styles/*.css')
      .pipe(concatCss('main.css'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(dest('app/styles'));
}

task('activate-browser-sync', () => {
  console.log('called activate-browser-sync task');
  browserSync.init({
    server: {
      baseDir: 'app',
    }
  });
});

task('default', series('compilesass', processCSS, 'activate-browser-sync'));

// watch('app/styles/*.*').on('change', () => {
//   console.log('app/styles change detected');
//   series('compilesass', processCSS, () => browserSync.reload())();
// });
watch('app/styles/*.*',
  series('compilesass', processCSS));
