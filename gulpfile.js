//Подключаем модули галпа
var gulp = require('gulp');
var sass = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

function style() {
    return gulp.src('assets/templates/ms-template/sass/style-v2.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/templates/ms-template/css'))
        .pipe(browserSync.reload({stream: true}));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/templates/ms-template/sass/**/*.{scss,sass}", style);
    gulp.watch("*.html").on("change", browserSync.reload);
}

gulp.task('watch', watch);