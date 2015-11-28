'use strict';

bricks.module('brickstv.start')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('start', {
                url: '/start/:id',
                controller: 'BricksTVStartController',
                template: '/modules/start/template.xml.js'
            });
    })

;
