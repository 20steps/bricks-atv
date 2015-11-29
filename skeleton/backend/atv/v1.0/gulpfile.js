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

var paths = {
    js_files: [
        // prepare environment for libs and bricks
        `lib/bricks-atv/src/infrastructure/core/environment.js`,

        // underscore
        `lib/underscore/underscore-min.js`,
        `lib/underscore.string/dist/underscore.string.min.js`,

        // async loading
        `lib/async/dist/async.min.js`,

        // date formatting
        `lib/i18next/i18next.min.js`,
        `lib/moment/min/moment-with-locales.min.js`,

        // bricks contrib
        `lib/bricks-atv/src/contrib/rsvp/rsvp.js`,
        `lib/bricks-atv/src/contrib/route-recognizer/dist/route-recognizer.js`,
        `lib/bricks-atv/src/contrib/router/router.js`,
        `lib/bricks-atv/src/contrib/loglevel/dist/loglevel.js`,
        `lib/bricks-atv/src/contrib/js-signals/dist/signals.js`,

        // bricks framework for ATV
        `lib/bricks-atv/src/infrastructure/core/kernel.js`,
        `lib/bricks-atv/src/infrastructure/core/eventProvider.js`,
        `lib/bricks-atv/src/infrastructure/core/moduleProvider.js`,
        `lib/bricks-atv/src/infrastructure/core/stateProvider.js`,
        `lib/bricks-atv/src/infrastructure/core/resourceLoader.js`,
        `lib/bricks-atv/src/infrastructure/core/apiLoader.js`,
        `lib/bricks-atv/src/infrastructure/core/run.js`,

        // your app config and utils
        `modules/app/config/bricks.js`,
        `modules/app/config/translations.js`,
        `modules/app/util/alert.js`,

        // your app feature modules
        `modules/app/module.js`,
        `modules/app/routing.js`,
        `modules/app/controller.js`,

        `modules/settings/module.js`,
        `modules/settings/routing.js`,
        `modules/settings/controller.js`,
        `modules/settings/reload.controller.js`,

        `modules/about/module.js`,
        `modules/about/routing.js`,
        `modules/about/controller.js`,

        `modules/start/module.js`,
        `modules/start/routing.js`,
        `modules/start/controller.js`,

        `modules/magazine/module.js`,
        `modules/magazine/routing.js`,
        `modules/magazine/controller.js`,

        `modules/magazine/post/module.js`,
        `modules/magazine/post/routing.js`,
        `modules/magazine/post/controller.js`,

        `modules/search/module.js`,
        `modules/search/routing.js`,
        `modules/search/controller.js`
    ]
};

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task('default', ['i18n-inject', 'build-app-js']);


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


gulp.task('build-app-js',function() {
    return gulp.src(paths.js_files)
        .pipe(concat('app.js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist/js'))
});
