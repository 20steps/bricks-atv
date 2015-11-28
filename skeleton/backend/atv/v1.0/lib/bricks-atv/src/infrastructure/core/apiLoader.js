'use strict';

log.debug('loading bricks.infrastructure.core.moduleProvider');

bricks.apiLoader = {
	call: function(path) {
		log.debug('bricks.apiLoader.call',path);
		var url = bricks.config.options.BASEURL_API+path;
		log.debug('url',url);
		var promise = new global.RSVP.Promise(function(resolve,reject) {
			var client = new XMLHttpRequest();
			log.debug('callig url',url);
			client.open("GET", url);
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.send();

			function handler() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						var json = JSON.parse(this.responseText)
						log.debug('json',json);
						resolve(json);
					} else {
						log.debug('rejecting')
						reject(this);
					}
				}
			};
		});

		return promise;
	}
}

