'use strict';

log.debug('loading bricks.infrastructure.core.userService');

bricks.userService = {

    token: null,

    user: null,

    init: function() {
        log.debug('bricks.userService.init');

        var token = localStorage.getItem('token');
        if (token) {
            log.debug('Got token on init',token);
            bricks.userService.token = token;
            bricks.userService.startLoop();
        } else {
            log.debug('No token found in local storage');
        }

    },

    getToken: function() {
        return bricks.userService.token;
    },

    setToken: function(token) {
        log.debug('bricks.userService.setToken',token);
        bricks.userService.token = token;
        if (token) {
            localStorage.setItem('token',token);
            bricks.userService.startLoop();
        } else {
            log.debug('removing token');
            localStorage.removeItem('token');
        }
        log.debug('end of set token');
    },

    hasToken: function() {
        return bricks.userService.token != null;
    },

    isLoggedIn: function() {
        return bricks.userService.user!=null;
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
        bricks.userService.user=null;
    },

    getAuthenticationKey: function() {
        return bricks.apiLoader.call('authentication/key.json?uuid=123');
    },

    getAuthenticationToken: function(key) {
        return bricks.apiLoader.call('authentication/token.json?key='+encodeURIComponent(key));
    },


    pollAuthenticationToken: function(key,successSref,errorSref,pollInterval) {
        successSref = successSref || 'start';
        errorSref = errorSref || 'start';
        pollInterval = pollInterval || 1000;
        log.debug('bricks.userSerrvice.pollAuthenticationToken',successSref,errorSref,pollInterval);
        if (bricks.userService.pollAuthenticationTokenInterval) {
            clearInterval(bricks.userService.pollAuthenticationTokenInterval);
        }
        bricks.userService.pollAuthenticationTokenInterval = setInterval(function () {
            bricks.userService.getAuthenticationToken(key).then(function (response) {
                log.debug('got authentication response', response);
                if (response.data.status == 'CONFIRMED') {
                    log.debug('authentication key was confirmed, setting token');
                    clearInterval(bricks.userService.pollAuthenticationTokenInterval);
                    bricks.userService.setToken(response.data.token);
                    bricks.userService.info().then(function (response) {
                        log.debug('going to', successSref);
                        navigationDocument.popDocument();
                        bricks.stateProvider.go(successSref);
                    }, function (error) {
                        log.debug('going to', errorSref);
                        navigationDocument.popDocument();
                        bricks.stateProvider.go(errorSref,null,true);
                    });
                } else if (response.data.status == 'WAITING_FOR_CONFIRMATION') {
                    log.debug('waiting for confirmation');
                } else if (response.data.status == 'UNKNOWN_KEY') {
                    log.debug('authentication key unknown, probably expired, going to start');
                    clearInterval(bricks.userService.pollAuthenticationTokenInterval);
                    log.debug('going to', errorSref);
                    navigationDocument.popDocument();
                    bricks.stateProvider.go(errorSref,null,true);
                } else {
                    log.debug('unknown state, canceling');
                    clearInterval(bricks.userService.pollAuthenticationTokenInterval);
                    log.debug('going to', errorSref);
                    navigationDocument.popDocument();
                    bricks.stateProvider.go(errorSref,null,true);
                }
            }, function (error) {
                log.debug('getting authentication token failed', error);
            });
        }, 1000);
    },

    logout: function(sref) {
        sref = sref || 'start';
        log.debug('logging out');
        bricks.userService.stopLoop();
        bricks.userService.clear();
        bricks.stateProvider.go(sref,null,true)
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
