(function($, jQuery) {
	jQuery.fn.cardselection = function(options) {
		var el = this;
		options = jQuery.extend({}, jQuery.fn.cardselection.options, options);
		el.on('click', function(event) {
			var socket,
				cardValue,
				user,
				selectedCard,
				pokerCardsBack;

			// Ignore request if the poker cards are not already shown
			pokerCardsBack = $(options.pokerCardBackClass); 
			if (pokerCardsBack.length > 0 && !pokerCardsBack.is(':visible')) {
				return;
			}

			socket = window.managedSocket;
			selectedCard = $(event.target);
			cardValue = selectedCard.html();
			user = JSON.parse(localStorage.getItem(options.lsUserKey));

			socketData = {
				type: 'play-card',
				userId: user.id,
				cardValue: cardValue,
				userName: user.name
			};

			socket.emit(socketData.type, socketData);
			$('.' + options.selectedClass).removeClass(options.selectedClass);
			selectedCard.addClass(options.selectedClass);
		})

		window.managedSocket.on('selected-card', function(cardData) {
			$(el).find('.poker-card').filter(function(idx) {
				return this.innerHTML == cardData.card.cardValue;

			}).addClass(options.selectedClass);
		})
	};

	jQuery.fn.cardselection.options = {
		lsUserKey: 'user',
		selectedClass: null,
		pokerCardBackClass: null
	};
})(jQuery, jQuery);