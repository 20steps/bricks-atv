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
        log.debug('bricks.userService.setToken',token)
        bricks.userService.token = token;
    },

    hasToken: function() {
        return bricks.userService.token != null;
    },

    setUser: function(user) {
        log.debug('setting user',user);
        bricks.userService.user = user;
    },

    getUser: function() {
        log.debug('getting user',bricks.userService.user);
        return bricks.userService.user;
    },

    clear: function(token) {
        bricks.userService.setToken(null);
    },

    getAuthenticationKey: function() {
        return bricks.apiLoader.call('authentication/key.json?uuid=123');
    },

    pollAuthenticationToken: function(key) {
        return bricks.apiLoader.call('authentication/token.json?key='+encodeURIComponent(key));
    },

    info: function() {
      return bricks.authenticatedApiLoader.call('users/self/info.json');
    }


};

bricks.userService.init();
