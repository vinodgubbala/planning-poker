PokerUserStory = function() {

}
PokerUserStory.prototype.currentUserstory = '';

PokerUserStory.prototype.set = function(userstory) {
	this.currentUserstory = userstory;
};

PokerUserStory.prototype.get = function() {
	return this.currentUserstory;
};

PokerUserStory.prototype.remove = function() {
	this.set('');
};


module.exports = PokerUserStory;