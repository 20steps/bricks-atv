'use strict';

log.debug('loading bricks.infrastructure.core.moduleProvider');

bricks.resourceLoader = {
    load: function(resource, context, callback) {
        log.debug('bricks.resourceLoader.load',resource,context);

        var self = this;

        if (!context) {
            context = {};
        }

        // augment context with basic stuff from bricks
        context.bricks = {
            config: bricks.config,
            device: bricks.device
        };

        var url = bricks.config.options.BASEURL+resource;
        log.debug('loading resource from url',url);

        /**
         * evaluateScripts is responsible for loading the JavaScript files neccessary
         * for you app to run. It can be used at any time in your apps lifecycle. In
         * this implementation we are using evaluate scripts to load and evaluate
         * template files saved as JavaScript string templates.
         *
         * @param - Array of JavaScript URLs
         * @param - Function called when the scripts have been evaluated. A boolean is
         * passed that indicates if the scripts were evaluated successfully.
         */
        evaluateScripts([url], function(success) {
            log.debug('resource loaded',success);
            if (success) {
                var resource = Template.call(self, context, function(err, res){
                    callback.call(self, res);
                });
            } else {
                log.error('resources loading failed');
                var title = "Resource Loader Error",
                    description = `There was an error attempting to load the resource '${resource}'. \n\n Please try again later.`,
                    alert = createAlert(title, description);

                bricks.stateProvider.hideLoadingIndicator();
                navigationDocument.presentModal(alert);
            }
        });
    }
}