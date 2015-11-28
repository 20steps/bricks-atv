'use strict';

bricks.module('brickstv.about')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('about', {
                url: '/about',
                controller: 'BricksTVAbountController',
                template: '/modules/about/template.xml.js'
            });
    })

;
