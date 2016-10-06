import gulp from 'gulp';
import babel from 'gulp-babel';
import chmod from 'gulp-chmod';

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['default']);
});
