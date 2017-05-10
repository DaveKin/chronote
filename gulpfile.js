const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('default', ['clean'], () => {

  // script
  gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist'));

  // style
  gulp.src('src/**/*.scss')
  .pipe(
    sass({ outputStyle: 'compressed'})
    .on('error', sass.logError)
  )
  .pipe(gulp.dest('dist'));

  // everything else
  gulp.src(['src/**/*.*','!src/**/*.js','!src/**/*.scss'])
  .pipe(gulp.dest('dist'));

});

gulp.task('clean', (cb) => {
  //clean
  return del('dist');
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', ['default']);
});