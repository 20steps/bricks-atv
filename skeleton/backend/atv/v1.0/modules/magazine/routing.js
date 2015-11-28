'use strict';

bricks.module('brickstv.magazine')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('magazine', {
                url: '/magazine',
                controller: 'BricksTVMagazineController',
                template: '/modules/magazine/template.xml.js'
            });
    })

;
