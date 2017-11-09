const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const image = require('gulp-image');

//Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'assets/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('public_html/css'))
        .pipe(browserSync.stream());
});

//Move JS Files to src/js
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('public_html/js'))
        .pipe(browserSync.stream());
});

//Watch Sass & Server
gulp.task('serve', function () {
    browserSync.init({
        server: './public_html'
    });

    gulp.watch(['assets/scss/*.scss'], ['sass']);
    gulp.watch('templates/*.html', ['html']);
});

//Move Fonts Folder to src
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('public_html/fonts'));
});

//Move Fonts Awesome CSS to src/css
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('public_html/css'));
});

gulp.task('html', function () {
    return gulp.src('templates/*.html')
        .pipe(gulp.dest('public_html'))
        .pipe(browserSync.stream());
});

//Copy image
gulp.task('image', function () {
    return gulp.src('assets/img/*')
        .pipe(gulp.dest('public_html/img'))
});

gulp.task('default', ['js', 'html', 'fa', 'fonts', 'image', 'serve']);
