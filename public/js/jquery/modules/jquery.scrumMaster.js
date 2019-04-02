(function($, jQuery) {
	jQuery.fn.scrumMaster = function(options) {
		options = jQuery.extend({}, jQuery.fn.scrumMaster.options, options);

		var me,
			listeners;

		me = $(this);
		me.options = options;

		$(options.pokerCardsShowButton).on('click', function(event) {
			var pushData = {
				type: 'show-cards',
				channel: window.channel
			};
			window.managedSocket.emit(pushData.type, pushData);
		});

		$(options.pokerCardsResetButton).on('click', function(event) {
			var reallyDelete,
				pushData;

			reallyDelete = confirm(options["i18n"]["cards-reset-confirm"]);
			if (reallyDelete) {
				var pushData = {
					type: 'reset-cards',
					channel: window.channel
				};
				window.managedSocket.emit(pushData.type, pushData);
			}
		});

		$(options.pokerRoomResetButton).on('click', function(event) {
			var reallyReset,
				pushData;

			reallyReset = confirm(options["i18n"]["room-reset-confirm"]);
			if (reallyReset) {
				pushData = {
						type: 'reset-room',
						channel: window.channel
				};
				window.managedSocket.emit(pushData.type, pushData);
			}
		});

		listeners = $({});

		window.managedSocket.on('reset-room', function(message) {
			// Type: 'reset-room'
			// So far this is the only type this module supports, so there is no need for a use case yet
			$(options.userstory).hide(400);
		});

		window.managedSocket.on('show-cards', function(message) {
			$('.' + options.showCardsSelectorClass).removeClass(options.showCardsToggleClass);
			$(options.pokerCardsShowButton).attr('disabled', 'disabled');
		});

		return listeners;
	};	

	jQuery.fn.scrumMaster.options = {
		pokerCardsShowButton: null,
		pokerCardsResetButton: null,
		pokerRoomResetButton: null,
		showCardsSelectorClass: null,
		showCardsToggleClass: null,
		userstory: null,
		"i18n": null
	};
})(jQuery, jQuery);