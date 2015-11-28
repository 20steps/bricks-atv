'use strict';

log.debug('bricks.infrastructure.core.run')

bricks.run = function() {
    log.debug('bricks.infrastructure.core.run.run')

    // initialize stateProvider
    log.debug('initialing bricks.stateProvider.router');
    bricks.stateProvider.router.map(function(match) {
        log.debug('map called');

        for (var i=0; i<bricks.stateProvider.states.length; i++) {
            var state = bricks.stateProvider.states[i];
            log.debug('map',state);
            match(state.url).to(state.controller);
        }

    });

    log.debug('Detected language',bricks.config.language);
    log.debug('Detected stage ', bricks.config.stage);
    if(bricks.config.options.STAGE == 'dev' && typeof bricks.config.overrideLanguageForDev !== 'undefined') {
        log.debug('Overriding language in stage dev',bricks.config.overrideLanguageForDev);
        bricks.config.language = bricks.config.overrideLanguageForDev;
    }

    log.debug('Using i18nResources ', bricks.config.i18nResources[bricks.config.language]);
    moment.locale(bricks.config.language);

    log.debug('Initializing i18next');
    window.i18n.init({
        useCookie: false,
        useLocalStorage: false,
        resStore: bricks.config.i18nResources,
        lng: bricks.config.language
    },function() {
        log.debug('Initialized i18next');
        log.debug('Initializing menu template');
        bricks.resourceLoader.load('/modules/menu/template.xml.js',
            {},
            function (resource) {
                log.debug('Pushing menu template as initial document');
                var doc = bricks.stateProvider.makeDocument(resource);
                doc.addEventListener("select", bricks.stateProvider.handleEvent.bind(bricks.stateProvider));
                navigationDocument.pushDocument(doc);
            }
        );
    });

}
