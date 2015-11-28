'use strict';

log.debug('loading bricks.infrastructure.core.eventProvider');

bricks.eventProvider = {
    Event: global.Signal,
    events: [],
    broadcast: function(name,args) {
        log.debug('bricks.infrastructure.core.eventProvider.broadcast',name,args);
        if (typeof bricks.eventProvider.events[name] === 'undefined') {
            log.debug('creating event on broadcast',name);
            bricks.eventProvider.events[name] = new bricks.eventProvider.Event();
        }
        log.debug('broadcasting event',name,args)
        bricks.eventProvider.events[name].dispatch('broadcast',args);
    },
    on: function(name,callback) {
        log.debug('bricks.infrastructure.core.eventProvider.on',name,callback);
        if (typeof bricks.eventProvider.events[name] == 'undefined') {
            log.debug('creating event on on',name);
            bricks.eventProvider.events[name] = new bricks.eventProvider.Event();
        }
        bricks.eventProvider.events[name].add(callback);
    }
};
