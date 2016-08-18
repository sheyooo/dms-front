var gulp = require('gulp'),
  sass = require('gulp-sass');

gulp.task('build-css', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('watch-css', function() {
  return gulp.watch('src/css/*.scss', ['build-css']);
});
