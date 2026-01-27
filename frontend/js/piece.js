// Tetromino piece class
import { PIECES, COLORS } from './constants.js';

export class Piece {
    constructor(type) {
        this.type = type;
        this.shape = PIECES[type];
        this.color = COLORS[type];
        this.x = 3; // Start position
        this.y = 0;
        this.rotation = 0;
    }

    rotate() {
        // Rotate the shape 90 degrees clockwise
        const n = this.shape.length;
        const rotated = Array(n).fill(null).map(() => Array(n).fill(0));

        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                rotated[col][n - 1 - row] = this.shape[row][col];
            }
        }

        this.shape = rotated;
        this.rotation = (this.rotation + 1) % 4;
    }

    rotateBack() {
        // Rotate 3 times to go back
        for (let i = 0; i < 3; i++) {
            this.rotate();
        }
    }

    clone() {
        const cloned = new Piece(this.type);
        cloned.shape = this.shape.map(row => [...row]);
        cloned.x = this.x;
        cloned.y = this.y;
        cloned.rotation = this.rotation;
        return cloned;
    }
}
