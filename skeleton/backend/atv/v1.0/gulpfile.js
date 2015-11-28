var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var uglifyJs = require('gulp-uglifyjs');
var addsrc = require('gulp-add-src');
var concat_json = require("gulp-concat-json");
var extend = require('gulp-extend');
var inject = require('gulp-inject');
var gfi = require("gulp-file-insert");
var del = require('del');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');

var config = {
    env: 'dev' // set prod for production variant
};

var paths = {
    modules_js: [
        './modules/**/*.js'
    ]
};

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task('default', ['i18n-inject']);


gulp.task('i18n-inject', ['i18n-collect-de','i18n-collect-en'], function () {

    gulp.src('modules/app/config/translations.edit.js')
        .pipe(gfi({
            "/* de.json */": "dist/i18n/de.json",
            "/* en.json */": "dist/i18n/en.json"
        }))
        .pipe(rename("translations.js"))
        .pipe(gulp.dest('modules/app/config/'));

});

gulp.task('i18n-collect-de', function () {

    var stream = gulp.src("modules/**/de.json")
        .pipe(extend("de.json"))
        .pipe(gulp.dest("dist/i18n"));

    return stream;

});


gulp.task('i18n-collect-en', function () {

    var stream = gulp.src("modules/**/en.json")
        .pipe(extend("en.json"))
        .pipe(gulp.dest("dist/i18n"));

    return stream;

});

