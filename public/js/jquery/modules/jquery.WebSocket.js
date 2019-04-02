(function($){

    // attach to jQuery
    $.extend({
        // export WebSocket = $.WebSocket
        WebSocket: function(options) {
			var socket,
				me;

			me = this;
			this.options = options;
			// Option keys which will be set as class properties in setOptions
			this.optionsAsProperty = ['elements'];
			// Websocket messages / listeners which are allowed when user is not logged in
			this.allowedListenersWhenLoggedOut = ['open', 'login'];
			// number of reconnects tried
			this.reconnectsTried = 0;

			this.setOptions = function(options) {
				for (var key in options) {
					if (this.optionsAsProperty.indexOf(key) != -1) {
						var setFunctionName = 'set' + key[0].toUpperCase() + key.substr(1),
							setFunction = this[setFunctionName],
							value = this[key] = options[key];
						if (setFunction) {
							setFunction.apply(this, [value])
						}
					}
				}
			};

			this.reconnectionCallback = function() {
				if (window.managedSocket.disconnected) {
					return;
				}
				notificationText = notification.find('#poker-notification-text');
				notificationText.html(options["i18n"]["connection-broken"]);
				notificationText.removeClass(me.elements.loaderBackgroundClass);
			};


			this.isUserLoggedIn = function() {
				return localStorage.getItem(me.options.lsUserKey) !== null;
			};

			this.isAllowedListenerWhenLoggedOut = function(listener) {
				return me.allowedListenersWhenLoggedOut.indexOf(listener) != -1
			};
			this.onclose = function() {
				var notification,
						notificationText,
						reconnectionCallback;

					notification = $(me.elements.notification);
					notification.find('#poker-notification-title').html(options["i18n"]["connection-interrupted"]);
					notificationText = notification.find('#poker-notification-text');
					notificationText.html(options["i18n"]["connection-reconnecting"]);
					notificationText.addClass(me.elements.loaderBackgroundClass);
					notification.show(400);

					//me.reconnectionCallback();
			}

			this.connect = function() {
				/*var socketOpts = this.options.socket;
				socket = new WebSocket('ws://' + socketOpts.address + ':' + socketOpts.port);
				window.managedSocket = socket;
				socket.onopen = this.onopen;*/
				if (me.socket) {
					me.socket.open();
					return;
				}
				var socketOpts = this.options.socket,
					socket = io({
						query: {
							room: socketOpts.room
						}
					});//('/' + socketOpts.room);
				me.socket = window.managedSocket = socket;
				socket.on('disconnect', function() {
					me.onclose();
				});
				socket.on('reconnect', function() {
					me.reconnectionCallback();
				});
			};

			this.connect();

			return this;
		}
	});
})(jQuery);