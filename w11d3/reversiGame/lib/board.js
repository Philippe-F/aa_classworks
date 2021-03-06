let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid() {
    let grid = Array.from(Array(8), () => new Array(8));
    grid[3][4] = new Piece("black");
    grid[4][3] = new Piece("black");
    grid[3][3] = new Piece("white");
    grid[4][4] = new Piece("white");
    return grid;
};

/**
 * Constructs a Board with a starting grid set up.
 */
function Board() {
    this.grid = _makeGrid();
}

Board.DIRS = [
    [0, 1], // [4,4] + [0,1] = [4,5]
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function(pos) {
    if (this.isValidPos(pos)) {
        const piece = this.grid[pos[0]][pos[1]];
        return piece;
    } else {
        throw new Error("Invalid position")
    }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function(color) {};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function(pos, color) {
    let piece = this.getPiece(pos)
    return piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function(pos) {
    let piece = this.getPiece(pos)
    return !!piece;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function() {
    if (this.validMoves("black").length === 0 || this.validMoves("white").length === 0) {
        return true;
    } else {
        return false;
    };
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function(pos) {
    if (pos[0] >= 0 && pos[1] >= 0 && pos[0] < 8 && pos[1] < 8) {
        return true;
    } else {
        return false;
    };
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip(board, pos, color, dir, piecesToFlip) {
    if (piecesToFlip) {
        piecesToFlip.push(pos);
    } else {
        piecesToFlip = [];
    };

    let position = [pos[0] + dir[0], pos[1] + dir[1]];

    if (!board.isValidPos(position)) {
        return null;
    } else if (!board.isOccupied(position)) {
        return null;
    } else if (board.isMine(position, color)) {
        if (piecesToFlip.length > 0) {
            return piecesToFlip;
        } else {
            return null;
        };
    } else {
        _positionsToFlip(board, position, color, dir, piecesToFlip);
    };
    return piecesToFlip;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function(pos, color) {

};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function() {};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */

Board.prototype.validMove = function(pos, color) {

    Board.DIRS.forEach((grid_pos) => {
        let positions = this._positionsToFlip(this, pos, color, grid_pos)
        if (positions.length > 0) {
            return true;
        }
    });
    return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function(color) {
    let moves = []
    let pos;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            pos = [i, j]
            if (this.validMove(pos, color)) {
                moves.push(pos)
            }
        }
    }
    return moves;
};

module.exports = Board;



function Cat(name) {
    this.name = name;
    this.func = (trick) => `${this.name} ${trick}`
}