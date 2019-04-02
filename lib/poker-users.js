CurrentUsers = function() {
	var me = this;
	me.usersList = {};

};

CurrentUsers.prototype.remove = function(userId) {
	this.usersList[userId] = null;
    delete this.usersList[userId];
};

CurrentUsers.prototype.add = function(user) {
	this.usersList[user.id] = user;
	/*for (let index = 0; index < 20; index++) {
		this.usersList[index] = {
			id: index,
			name: 'NAME ____ ' + index,
			role: 'scrumMaster'
		};
	}*/
};

CurrentUsers.prototype.getAll = function() {
	return this.usersList;
};

module.exports = CurrentUsers;