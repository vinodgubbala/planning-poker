PokerCards = function() {
	this.carddisplay = {
		cards: {}
	};
}



PokerCards.prototype.show = false;

PokerCards.prototype.carddisplay = null;

PokerCards.prototype.setCard = function(userId, cardValue) {
	// Allow only if cards are not already shown
	if (!this.show) {
		this.carddisplay.cards[userId] = cardValue
		return true;
	}
	return false;
};

PokerCards.prototype.removeCard = function(userId) {
	if(this.show) {
		return;	
	}
	this.carddisplay.cards[userId] = null;
	delete this.carddisplay.cards[userId];
};

PokerCards.prototype.getCard = function(userId) {
	return this.carddisplay.cards[userId];
};

PokerCards.prototype.reset = function() {
	this.carddisplay = {
        cards: {}
    };
    this.show = false;
};

PokerCards.prototype.getAll = function() {
	return {
		cards: this.carddisplay.cards,
		show: this.show
	};
};

module.exports = PokerCards;