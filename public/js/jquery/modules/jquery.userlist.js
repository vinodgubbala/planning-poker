(function(jQuery, $) {
	jQuery.fn.userlist = function(options) {
		var me,
			listeners,
			cardsData = null;

		options = jQuery.extend({}, jQuery.fn.userlist.options, options);
		me = $(this);

		listeners = $({});
		window.managedSocket.on('userlist', function(message) {
			jQuery.fn.userlist.update.call(me, message.data, options);
			if (cardsData) {
				jQuery.fn.userlist.updateVotes.call(me, cardsData, options);	
			}
		});
		window.managedSocket.on('carddisplay', function(message) {
			jQuery.fn.userlist.updateVotes.call(me, message.data, options);
			cardsData = message.data;
		});
		return listeners;
	};

	jQuery.fn.userlist.update = function(users, options) {
		var userArray,
			userArraySorted;

		window.currentUsers = users;

		userArray = jQuery.fn.userlist.sort(users, options);
		userArraySorted = [];

		
		// Second: Create HTML Elements in one one-dimensional array that then is already
		// sorted like we want it
		for (var role in options.availableRoles) {
			for (userId in userArray[role]) {
				var user = userArray[role][userId];
				userArraySorted.push('<span data-userid="' + user.id + '" class="poker-role not-voted poker-role-' + user.role + '">' + user.name.escape() + '</span>');
			}
		}
		// Third: Set logged in users
		$(this).html(userArraySorted.join(' '));
	};

	jQuery.fn.userlist.updateVotes = function(data, options) {
		$('.poker-role').addClass('not-voted');
		for (var userId in data.cards) {
			var card = data.cards[userId];
			$('.poker-role[data-userid=' + userId + ']').removeClass('not-voted');
		}
	}

	jQuery.fn.userlist.sort = function(users, options) {
		var userArray;

		userArray = [];
		// First: Sort the users by role
		// The sorting order is the one given in availableRoles (see index.html for this definition)
		for (var role in options.availableRoles) {
			userArray[role] = [];
		}
		for (userId in users) {
			var span,
				user;

			user = users[userId];
			userArray[user.role].push(user);
		}
		return userArray;
	};

	jQuery.fn.userlist.options = {
		availableRoles: {}
	};
})(jQuery, jQuery);