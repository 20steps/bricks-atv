'use strict';

console.log('bricks.infrastructure.core.kernel',bricks.config.options.STAGE);

// set loglevel depending on stage
if (bricks.config.options.STAGE == 'dev') {
    log.setLevel('debug');
} else if (bricks.config.options.STAGE == 'prelive') {
    //log.setLevel('info');
    log.setLevel('debug');
} else if (bricks.config.options.STAGE == 'test') {
    log.setLevel('warning');
} else {
    log.setLevel('error');
}

bricks.kernel = {

};

