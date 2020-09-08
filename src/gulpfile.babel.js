import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import del from 'del';
import browserify from 'gulp-browserify';
import babelify from 'babelify';

sass.compiler = require('node-sass');

const paths = {
  styles: {
    src: 'assets/scss/styles.scss',
    dest: 'static/styles',
    watch: 'assets/scss/**/*.scss',
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'static/js',
    watch: 'assets/js/**/*.js',
  },
};

const clean = () => del('static');

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babelify.configure({
            presets: ['@babel/preset-env'],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

// dev version
// const dev = gulp.series([clean, styles, js, watchFiles]);
// export default dev;

// build version
const build = gulp.series([clean, styles, js]);
export default build;
