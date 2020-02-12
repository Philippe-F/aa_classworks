const View = require("./ttt-view");
const Game = require("../solution/Game");


$(() => {
  const game = new Game();
  const $ttt = $("figure");
  const view = new View(game, $ttt);
    
});
