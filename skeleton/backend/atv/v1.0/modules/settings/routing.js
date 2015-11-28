'use strict';

bricks.module('brickstv.settings')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('settings', {
                url: '/settings',
                controller: 'BricksTVSettingsController',
                template: '/modules/settings/template.xml.js'
            })
            .state('settings_reload', {
                url: '/settings/reload',
                controller: 'BricksTVSettingsReloadController'
            });
    })

;
