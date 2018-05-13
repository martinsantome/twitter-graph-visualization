function ChessIt() {

  this.board;
  this.game = new Chess();


  var self = this;

  this.removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
  };

  this.greySquare = function(square) {
    var squareEl = $('#board .square-' + square);
    
    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
      background = '#696969';
    }

    squareEl.css('background', background);
  };

  this.onDragStart = function(source, piece) {
    // do not pick up pieces if the game is over
    // or if it's not that side's turn

    if (self.game.game_over() === true || piece.search(/^w/) == -1) {
      return false;
    }
  };

  this.onDrop = function(source, target) {
    self.removeGreySquares();

    // see if the move is legal
    var move = self.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

  };

  this.onMouseoverSquare = function(square, piece) {
    return;
    // get list of possible moves for this square
    var moves = self.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    self.greySquare(square);

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      self.greySquare(moves[i].to);
    }
  };

  this.onMouseoutSquare = function(square, piece) {
    self.removeGreySquares();
  };

  this.onSnapEnd = function() {
    self.board.position(self.game.fen());
    
    if (self.game.in_checkmate()){
      alert("done");
    } else {

    }

  };

  var cfg = {
    draggable: true,
    position: "ppppkppp/pppppppp/pppppppp/1pppppp1/2pppp2/3pp3/PPPPPPPP/RNBQKBNR w KQkq -",
    onDragStart: this.onDragStart,
    onDrop: this.onDrop,
    onMouseoutSquare: this.onMouseoutSquare,
    onMouseoverSquare: this.onMouseoverSquare,
    onSnapEnd: this.onSnapEnd
  };

  self.board = ChessBoard('board', cfg);

}

ChessIt.prototype.setPosition = function (position){

  self = this;
  
  var cfg = {
    draggable: true,
    position: position,
    onDragStart: this.onDragStart,
    onDrop: this.onDrop,
    onMouseoutSquare: this.onMouseoutSquare,
    onMouseoverSquare: this.onMouseoverSquare,
    onSnapEnd: this.onSnapEnd
  };

  this.board = ChessBoard('board', cfg);
}

ChessIt.prototype.out = function(){
  
  document.getElementById("board").innerHTML = "";  
}

