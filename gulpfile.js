//Подключаем модули галпа
var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

function style() {
    return gulp.src('assets/templates/ms2/sass/style-v2.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/templates/ms2/css'))
        .pipe(browserSync.reload({stream: true}));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/templates/ms2/sass/**/*.{scss,sass}", style);
    gulp.watch("*.html").on("change", browserSync.reload);
}

gulp.task('watch', watch);