'use strict';

bricks.module('brickstv.app').controller('BricksTVAppController', {

    // if a controller provides an init function it is called on registration of the controller
    // - can be used e.g. for registering event handlers using the bricks.eventProvider
    // - init is only called once in the lifetime of a controller
    init: function() {
        log.info('BricksTVAppController.init');

        // listen to stateProvider.beforeModel and do something
        bricks.eventProvider.on('stateProvider.beforeModel',function(event,args) {
            log.debug('BricksTVAppController.on.stateProvider.beforeModel',event,args);
        })
    }

});
