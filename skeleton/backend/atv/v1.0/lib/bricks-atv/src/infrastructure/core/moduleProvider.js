'use strict';

log.debug('loading bricks.infrastructure.core.moduleProvider');

bricks.module = function(name) {
    return {
        'controller': function(name,callback) {
            bricks.stateProvider.controller(name,callback);
        },
        'config': function(callback) {
            callback();
        }
    }
}