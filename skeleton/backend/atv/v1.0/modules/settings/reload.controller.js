'use strict';

bricks.module('brickstv.settings')

    .controller('BricksTVSettingsReloadController', {

        resolve: function(stateParams) {
            // do the reload
            log.info('Triggering App.reload');
            App.reload({},{});
        },

    })

;
