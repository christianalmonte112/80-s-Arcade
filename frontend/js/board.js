// Board management
export class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        return Array(this.height).fill(null).map(() => Array(this.width).fill(0));
    }

    clear() {
        this.grid = this.createEmptyGrid();
    }

    isValid(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    isEmpty(x, y) {
        if (!this.isValid(x, y)) return false;
        return this.grid[y][x] === 0;
    }

    canMove(piece, dx, dy) {
        const newX = piece.x + dx;
        const newY = piece.y + dy;

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const x = newX + col;
                    const y = newY + row;

                    // Check boundaries
                    if (x < 0 || x >= this.width || y >= this.height) {
                        return false;
                    }

                    // Check if position is occupied (allow y < 0 for spawning)
                    if (y >= 0 && this.grid[y][x] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    addPiece(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const x = piece.x + col;
                    const y = piece.y + row;
                    if (this.isValid(x, y)) {
                        this.grid[y][x] = piece.color;
                    }
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;

        for (let row = this.height - 1; row >= 0; row--) {
            if (this.isLineFull(row)) {
                this.removeLine(row);
                linesCleared++;
                row++; // Check the same row again
            }
        }

        return linesCleared;
    }

    isLineFull(row) {
        return this.grid[row].every(cell => cell !== 0);
    }

    removeLine(row) {
        this.grid.splice(row, 1);
        this.grid.unshift(Array(this.width).fill(0));
    }

    getCell(x, y) {
        if (!this.isValid(x, y)) return 0;
        return this.grid[y][x];
    }
}
