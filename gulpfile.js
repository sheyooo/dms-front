var gulp = require('gulp'),
  sass = require('gulp-sass');

gulp.task('build-css', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch-css', function() {
  return gulp.watch('src/css/*.scss', ['build-css']);
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('public/img'));
});

gulp.task('semantic', function() {
  return gulp.src('src/semantic/*.*')
    .pipe(gulp.dest('public/semantic'));
});

gulp.task('semantic-icons', function() {
  return gulp.src('src/semantic/icons/*')
    .pipe(gulp.dest('public/semantic/themes/default/assets/fonts'));
});

gulp.task('build', [
  'html',
  'images',
  'semantic',
  'semantic-icons',
  'build-css'
]);
