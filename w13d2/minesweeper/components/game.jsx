import React from 'react';
import Board from './board';
import * as Sweeper from '../minesweeper';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Sweeper.Board(9, 1)
    };
    this.updateGame = this.updateGame.bind(this);
  }

  updateGame() {

  };

  render() {
    return (
      <div>
          <Board board={this.state.board} updateGame={this.updateGame} />
      </div>
  )
  }
}