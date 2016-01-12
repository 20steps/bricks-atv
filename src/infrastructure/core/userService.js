'use strict';

log.debug('loading bricks.infrastructure.core.userService');

bricks.userService = {

    token: null,

    user: null,

    init: function() {
        log.debug('bricksUserService.init');
    },

    getToken: function() {
        return bricks.userService.token;
    },

    setToken: function(token) {
        bricks.userService.token = token;
    },

    hasToken: function() {
        return bricks.userService.token != null;
    },

    getUser: function() {
        return bricks.userService.user;
    },

    clear: function(token) {
        bricks.userService.setToken(null);
    },

    getAuthenticationKey: function() {
        return bricks.apiLoader.call('authentication/key.json');
    },

    pollAuthenticationToken: function(key) {
        bricks.apiLoader.call('authentication/token.json?key='+encodeURIComponent(key)).then(function(response) {
            log.debug('pollAuthenticationToken suceeded',response);
        },function() {
            log.debug('pollAuthenticationToken failed');
        });
    },

    info: function() {
      return bricks.authenticatedApiLoader.call('users/self/info.json');
    }


};

bricks.userService.init();
