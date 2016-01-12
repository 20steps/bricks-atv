'use strict';

log.debug('loading bricks.infrastructure.core.userService');

bricks.userService = {

    token: null,

    user: null,

    init: function() {
        log.debug('bricks.userService.init');

        var token = localStorage.getItem('token');
        var token=null;
        if (token) {
            log.debug('Got token on init',token);
            bricks.userService.token = token;
            bricks.userService.startLoop();
        }

    },

    getToken: function() {
        return bricks.userService.token;
    },

    setToken: function(token) {
        log.debug('bricks.userService.setToken',token);
        bricks.userService.token = token;
        localStorage.setItem('token',token);
        bricks.userService.startLoop();
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
        Storage.removeItem('token');
    },

    getAuthenticationKey: function() {
        return bricks.apiLoader.call('authentication/key.json?uuid=123');
    },

    pollAuthenticationToken: function(key) {
        return bricks.apiLoader.call('authentication/token.json?key='+encodeURIComponent(key));
    },

    startLoop: function() {
        log.debug('starting loop');
        if (bricks.userService.loop) {
            bricks.userService.stopLoop();
        }
        bricks.userService.loop = setInterval(function() {
            bricks.userService.info().then(function(response) {
                log.debug('setting user info in loop');
                bricks.userService.setUser(response.data.user);
            },function(error) {
                log.debug('error in loop',error);
                bricks.userService.clear();
            });
        },1000*60);
    },

    stopLoop: function() {
        log.debug('stopping loop');
        if (bricks.userService.loop) {
            clearInterval(bricks.userService.loop);
        }
    },

    info: function() {
      return bricks.authenticatedApiLoader.call('users/self/info.json');
    }

};

bricks.userService.init();
