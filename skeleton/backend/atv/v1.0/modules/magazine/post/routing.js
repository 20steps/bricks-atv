'use strict';

bricks.module('brickstv.magazine.post')

    .config(function() {

        // define states / routes as you would do in angular
        bricks.stateProvider
            .state('magazine_post', {
                url: '/magazine/:slug',
                controller: 'BricksTVMagazinePostController',
                template: '/modules/magazine/post/template.xml.js'
            });
    })

;
