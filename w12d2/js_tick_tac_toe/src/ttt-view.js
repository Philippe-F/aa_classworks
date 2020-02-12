const Game = require("../solution/Game");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", ((e) => {
      const $square = $(e.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;
    
    let $li = $("<li>${`currentPlayer`}</li>");
    this.game.playMove(pos);
  }

  setupBoard() {
    const list = $('<ul/>').appendTo(this.$el);
    const grid = this.game.board.grid;
    for(let i = 0; i < grid.length; i++ ){
      for (let j = 0; j < grid[0].length; j++) {
        let $li = $("<li>");
        $li.data("pos", [i, j]);
        list.append($li);
      }
    };
  }
}

module.exports = View;
