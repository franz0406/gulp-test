import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import autoPrefix from "gulp-autoprefixer";
import bro from "gulp-bro";
import babelify from "babelify";
const scss = require('gulp-sass')(require('sass'));

const deleteBuild = () => del("build");

const pug = () => 
    gulp.src("./src/*.pug")
        .pipe(gpug())
        .pipe(gulp.dest("build"));


const webserver = () =>
    gulp.src("build")
        .pipe(ws({
            livereload: true,
            open: true
        }));

const optimizationImages = () =>
        gulp.src("./src/images/*")
            .pipe(gulp.dest("build/images"));

const scssCompile = () =>
        gulp.src("./src/scss/style.scss")
            .pipe(scss().on('error', scss.logError))
            .pipe(autoPrefix())
            .pipe(gulp.dest("build/css"));

const jsCompile = () => 
        gulp.src("./src/js/main.js")
            .pipe(bro({
                transform: [
                    babelify.configure({ presets: ["@babel/preset-env"] }), 
                    [ 'uglifyify', { global: true } ]
                ]
            }))
            .pipe(gulp.dest("build/js"));

const watch = () => {
    gulp.watch("src/**/*.pug", pug);
    gulp.watch("src/scss/**/*.scss", scssCompile);
    gulp.watch("src/js/**/*.js", jsCompile);
}

export const build = gulp.series(deleteBuild, pug, webserver, optimizationImages, scssCompile, jsCompile, watch);