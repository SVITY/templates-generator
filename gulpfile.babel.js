import gulp from 'gulp';
import babel from 'gulp-babel';
import chmod from 'gulp-chmod';

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
    }))
    .pipe(chmod(755))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.js', ['default']);
});
