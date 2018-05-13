'use strict';

// Initializes FriendlyChat.
function Games(database) {
 
  // Shortcuts to DOM Elements.
  this.gamesList = document.getElementById('games'); 
  this.board = board;
  this.database = database;
  this.user;

}

// Template for messages.
Games.GAME_TEMPLATE = '<li class="name"></li>';



// Loads chat messages history and listens for upcoming ones.
Games.prototype.loadGames = function(user) {

  this.user = user;
  // Reference to the /messages/ database path.
  this.gamesRef = this.database.ref('games');
  // Make sure we remove all previous listeners.
  this.gamesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setGame = function(data) {
    var val = data.val();
    this.displayGame(data.key, val.name, val.position);
  }.bind(this);
  this.gamesRef.on('child_added', setGame);
  
};


// Displays a Message in the UI.
Games.prototype.displayGame = function(key, name, position) {
  
	var u = document.getElementById("games-list");

  var l = document.createElement('li');


	var a = document.createElement('a');
    a.innerHTML = name;
    a.style = "cursor:pointer;";
    var setPosition = function(){
      window.chessIt.setPosition(position);
    }
    a.onclick = setPosition;

  l.appendChild(a);
	u.appendChild(l); 
};

window.onload = function() {
  window.games = new Game();
};
