import React from 'react';
import * as Sweeper from '../minesweeper';
import Tile from './tile'; 

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  };

  render() {
    return (
      <div>{this.renderRows()}</div> 
    )
  };

  updateTiles(row) {
    return row.map((tile, i) => {
      return (
        <Tile
        key = {i} 
        tile = {tile}
        updateGame = {this.props.updateGame}
        />
      )
    });
  };

  renderRows() {
    const board = this.props.board;
    return board.grid.map((row, idx) => {
      return (
      <div key={idx}>{this.updateTiles(row, idx)}</div>
      )
    });
  };
};