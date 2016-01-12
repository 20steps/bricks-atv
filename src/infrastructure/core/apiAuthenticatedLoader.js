'use strict';

log.debug('loading bricks.infrastructure.core.moduleProvider');

bricks.authenticatedApiLoader = {
	call: function(path) {
		log.debug('bricks.authenticatedApiLoader.call',path);
		var url = bricks.config.options.BASEURL_API+'/authenticated/'+path;
		log.debug('url',url);
		var promise = new global.RSVP.Promise(function(resolve,reject) {
			var client = new XMLHttpRequest();
			log.debug('callig authenticated url',url);
			client.open("GET", url);
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.setRequestHeader("Authorization", "Bearer "+bricks.userService.getToken());
			log.debug('Authentication header set to ',"Bearer "+bricks.userService.getToken());
			client.send();

			function handler() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						var json = JSON.parse(this.responseText)
						// inject user info
						if (typeof response.data !== 'undefined') {
							json.data.user = bricks.userService.getUser();
						}
						log.debug('apiAuthenticatedLoader resolving',json);
						resolve(json);
					} else {
						log.debug('apiAuthenticatedLoader rejecting',this.status);
						reject(this);
					}
				}
			};
		});

		return promise;
	}
}

