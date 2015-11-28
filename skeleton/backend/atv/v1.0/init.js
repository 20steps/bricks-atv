'use strict';

// everything service and configuration bricks for ATV provides is found below this global
var bricks;

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = function(options) {

    console.log('App.onLaunch',options);

    // handover launch options to bricks
    bricks = {
        config: {
            options: options
        }
    };

    // load javascripts via evaluateScrips (cp. below) as there is no real DOM in this crazy environment ...)
    var javascriptFiles = [

        // prepare environment for libs and bricks
        `${options.BASEURL}/lib/bricks/infrastructure/core/environment.js`,

        // underscore
        `${options.BASEURL}/lib/underscore/underscore-min.js`,
        `${options.BASEURL}/lib/underscore.string/dist/underscore.string.min.js`,

        // async loading
        `${options.BASEURL}/lib/async/dist/async.min.js`,

        // date formatting
        `${options.BASEURL}/lib/i18next/i18next.min.js`,
        `${options.BASEURL}/lib/moment/min/moment-with-locales.min.js`,

        // bricks contrib
        `${options.BASEURL}/lib/bricks-atv/contrib/rsvp/rsvp.js`,
        `${options.BASEURL}/lib/bricks-atv/contrib/route-recognizer/dist/route-recognizer.js`,
        `${options.BASEURL}/lib/bricks-atv/contrib/router/router.js`,
        `${options.BASEURL}/lib/bricks-atv/contrib/loglevel/dist/loglevel.js`,
        `${options.BASEURL}/lib/bricks-atv/contrib/js-signals/dist/signals.js`,

        // bricks framework for ATV
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/kernel.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/eventProvider.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/moduleProvider.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/stateProvider.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/resourceLoader.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/apiLoader.js`,
        `${options.BASEURL}/lib/bricks-atv/infrastructure/core/run.js`,

        // your app config and utils
        `${options.BASEURL}/modules/app/config/bricks.js`,
        `${options.BASEURL}/modules/app/config/translations.js`,
        `${options.BASEURL}/modules/app/util/alert.js`,

        // your app feature modules
        `${options.BASEURL}/modules/app/module.js`,
        `${options.BASEURL}/modules/app/routing.js`,
        `${options.BASEURL}/modules/app/controller.js`,

        `${options.BASEURL}/modules/settings/module.js`,
        `${options.BASEURL}/modules/settings/routing.js`,
        `${options.BASEURL}/modules/settings/controller.js`,
        `${options.BASEURL}/modules/settings/reload.controller.js`,

        `${options.BASEURL}/modules/about/module.js`,
        `${options.BASEURL}/modules/about/routing.js`,
        `${options.BASEURL}/modules/about/controller.js`,

        `${options.BASEURL}/modules/start/module.js`,
        `${options.BASEURL}/modules/start/routing.js`,
        `${options.BASEURL}/modules/start/controller.js`,

        `${options.BASEURL}/modules/magazine/module.js`,
        `${options.BASEURL}/modules/magazine/routing.js`,
        `${options.BASEURL}/modules/magazine/controller.js`,

        `${options.BASEURL}/modules/magazine/post/module.js`,
        `${options.BASEURL}/modules/magazine/post/routing.js`,
        `${options.BASEURL}/modules/magazine/post/controller.js`,

        `${options.BASEURL}/modules/search/module.js`,
        `${options.BASEURL}/modules/search/routing.js`,
        `${options.BASEURL}/modules/search/controller.js`
    ];

    console.log('will evaluate scripts',javascriptFiles);

    /**
     * evaluateScripts is responsible for loading the JavaScript files neccessary
     * for you app to run. It can be used at any time in your apps lifecycle.
     * 
     * @param - Array of JavaScript URLs  
     * @param - Function called when the scripts have been evaluated. A boolean is
     * passed that indicates if the scripts were evaluated successfully.
     */
    evaluateScripts(javascriptFiles, function(success) {
        if (success) {
            log.debug("successfully evaluated scripts, will run Bricks");
            bricks.run();
        } else {
            console.log('evaluating scripts failed',success)
            /*var alert = createAlert(
             window.i18n.t("app.errors.script.title"),
             window.i18n.t("app.errors.script.description")
             );
             navigationDocument.presentModal(alert);
             throw ("Unable to evaluate scripts.");*/
        }
    });

}