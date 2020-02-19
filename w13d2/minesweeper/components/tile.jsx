import React, { useImperativeHandle } from 'react';
import * as Sweeper from '../minesweeper';

export default class Tile extends React.Component {
  constructor(props) {
    super(props); 
  };

  render() {
    const tile = this.props.tile;
    //if bombed, explored, flagged, unexplored💣🔍🇺🇸☘️
    let value, klass, num;
    if (tile.explored) {
      if (tile.bombed) {
        value = 'u\1F4A3';
        klass = 'bombed';
      } else {
        this.explored = true;
        num = adjacentBombCount()
        value = num ? num : "";
        klass = "explored";
      }
    }

    return (
      <div
        className={klass}
        onClick={this.handleClick}>
        {value}
      </div>   
    )
  };

  handleClick(e) {
    const flagged = e.altKey ? true : false;
    return flagged;
    // this.props.updateGame()
  }
};
//bomb u\1F4A3
//flag u\2691



