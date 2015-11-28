'use strict';

bricks.module('brickstv.about').controller('BricksTVAboutController', {

    // the resolve function generates or fetches the model
    // - parameters of ui-sref are handed over via the stateParams argument
    // - the function might either return a plain old object or a promise (hint: bricks.apiLoader.call(url) returns a promise)
    // - in case it returns a promise a loading indicator is automatically rendered while resolving or rejecting the promise
    resolve: function(stateParams) {
        log.info('BricksTVAboutController.model',stateParams);
        return null;

    },

    // model could be generated / fetched successfully prepare is called with the model as it's sole argument
    // - the pepare function can modify, select from or augment the model
    // - the return value of the function is the context for template invocation
    action: function(model) {
        log.info('BricksTVAboutController.action',model)
        return model;
    }

});
