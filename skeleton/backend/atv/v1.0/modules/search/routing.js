'use strict';

bricks.module('brickstv.settings')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('search', {
                url: '/search',
                controller: 'BricksTVSearchController',
                template: '/modules/search/template.xml.js'
            });
    })

;
