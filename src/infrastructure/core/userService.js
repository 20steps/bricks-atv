'use strict';

log.debug('loading bricks.infrastructure.core.userService');

bricks.userService = {

    token: null,

    user: null,

    init: function() {
        log.debug('bricksUserService.init');

        var token = Storage.getItem('token');
        if (token) {
            bricks.userService.token = token;
            bricks.userService.startLoop();
        }

    },

    getToken: function() {
        return bricks.userService.token;
    },

    setToken: function(token) {
        log.debug('bricks.userService.setToken',token)
        bricks.userService.token = token;
        Storage.setItem('token',token);
        bricksUserService.startLoop;
    },

    hasToken: function() {
        return bricks.userService.token != null;
    },

    setUser: function(user) {
        log.debug('setting user',user);
        bricks.userService.user = user;
        Storage.setItem('user',)
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
        if (bricksUserService.loop) {
            bricksUserService.stopLoop();
        }
        bricksUserService.loop = setInterval(function() {
            bricks.userService.info().then(function(response) {
                log.debug('setting user info in loop');
                bricks.userService.setUser(response.data.user);
            },function(error) {
                log.debug('error in loop',error);
                userService.clear();
            });
        },60);
    }

    stopLoop: function() {
        log.debug('stopping loop');
        if (bricksUserService.loop) {
            clearInterval(bricksUserService.loop);
        }
    }
    info: function() {
      return bricks.authenticatedApiLoader.call('users/self/info.json');
    }


};

bricks.userService.init();
