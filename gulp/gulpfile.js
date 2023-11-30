
const { src, dest, series, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-dart-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const gulpMinify = require('gulp-minify');

async function cleanup() {
  return del(['app/styles/main.css']);
}

async function compileSass() {
  return src('app/styles/*.scss')
      .pipe(gulpSass
          .sync({ outputStyle: 'compressed' }) // faster than async
          .on('error', gulpSass.logError))
      .pipe(dest('app/styles'));
};

async function processCss() {
  return src(['./app/styles/*.css', '!./app/styles/main.css'])
      .pipe(concatCss('main.css'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(dest('app/styles'))
      .pipe(browserSync.stream());
};

async function reload() {
  return browserSync.reload();
}

async function optimizeImages() {
  return src(['./app/*.png'])
      .pipe(imagemin())
      .pipe(dest('app/images'));
}

async function minifyJs() {
  return src(['./app/scripts/*.js', './app/scripts/*.mjs'])
      .pipe(gulpMinify())
      .pipe(dest('./app/scripts/minified/'));
}

exports.default = async function() {
  browserSync.init({
        server: {
          baseDir: './app/',
        }
      });

  series(optimizeImages)();

  watch('app/styles/*.scss',  { ignoreInitial: false }, compileSass);
  watch(['app/styles/*.css', '!app/styles/main.css'],
      { ignoreInitial: false }, series(cleanup, processCss, reload));
  watch(['app/scripts/*.js', 'app/scripts/*.mjs'],
      { ignoreInitial: false }, series(minifyJs));
};
