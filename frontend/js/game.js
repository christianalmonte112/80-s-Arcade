// Core game logic
import { Board } from './board.js';
import { Piece } from './piece.js';
import { PIECES, COLORS } from './constants.js';

export class Game {
    constructor(ui) {
        this.ui = ui;
        this.board = new Board(10, 20);
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.gameLoop = null;
        this.dropInterval = 1000; // 1 second initially
        this.lastDropTime = 0;
    }

    start() {
        // Reset game state
        this.board.clear();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.isPlaying = true;
        this.isPaused = false;

        // Update UI
        this.ui.updateScore(this.score);
        this.ui.updateLevel(this.level);
        this.ui.updateLines(this.lines);
        this.ui.hideGameOver();
        this.ui.showPauseButton();
        this.ui.hideStartButton();

        // Initialize pieces
        this.currentPiece = this.spawnPiece();
        this.nextPiece = this.spawnPiece();
        this.ui.drawNextPiece(this.nextPiece);

        // Start game loop
        this.lastDropTime = Date.now();
        this.gameLoop = requestAnimationFrame(() => this.update());
    }

    update() {
        if (!this.isPlaying || this.isPaused) {
            return;
        }

        const now = Date.now();
        const deltaTime = now - this.lastDropTime;

        // Auto drop piece
        if (deltaTime > this.dropInterval) {
            this.drop();
            this.lastDropTime = now;
        }

        // Draw everything
        this.draw();

        // Continue game loop
        this.gameLoop = requestAnimationFrame(() => this.update());
    }

    draw() {
        // Clear canvas
        this.ui.clearCanvas();

        // Draw board
        this.ui.drawBoard(this.board);

        // Draw current piece
        if (this.currentPiece) {
            this.ui.drawPiece(this.currentPiece);
        }

        // Draw ghost piece (preview where piece will land)
        if (this.currentPiece) {
            const ghostPiece = this.getGhostPiece();
            this.ui.drawGhostPiece(ghostPiece);
        }
    }

    spawnPiece() {
        const pieceTypes = Object.keys(PIECES);
        const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
        return new Piece(randomType);
    }

    drop() {
        if (!this.currentPiece) return;

        if (this.board.canMove(this.currentPiece, 0, 1)) {
            this.currentPiece.y++;
        } else {
            this.lockPiece();
        }
    }

    lockPiece() {
        // Add piece to board
        this.board.addPiece(this.currentPiece);

        // Check for completed lines
        const clearedLines = this.board.clearLines();
        if (clearedLines > 0) {
            this.updateScore(clearedLines);
        }

        // Spawn next piece
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.spawnPiece();
        this.ui.drawNextPiece(this.nextPiece);

        // Check if game over
        if (!this.board.canMove(this.currentPiece, 0, 0)) {
            this.gameOver();
        }
    }

    updateScore(linesCleared) {
        // Scoring system
        const pointsPerLine = [0, 100, 300, 500, 800];
        const points = pointsPerLine[linesCleared] * this.level;

        this.score += points;
        this.lines += linesCleared;

        // Level up every 10 lines
        const newLevel = Math.floor(this.lines / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
        }

        this.ui.updateScore(this.score);
        this.ui.updateLevel(this.level);
        this.ui.updateLines(this.lines);
    }

    moveLeft() {
        if (!this.isPlaying || this.isPaused || !this.currentPiece) return;

        if (this.board.canMove(this.currentPiece, -1, 0)) {
            this.currentPiece.x--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.isPlaying || this.isPaused || !this.currentPiece) return;

        if (this.board.canMove(this.currentPiece, 1, 0)) {
            this.currentPiece.x++;
            this.draw();
        }
    }

    softDrop() {
        if (!this.isPlaying || this.isPaused) return;

        this.drop();
        this.score += 1;
        this.ui.updateScore(this.score);
        this.draw();
    }

    hardDrop() {
        if (!this.isPlaying || this.isPaused || !this.currentPiece) return;

        let dropDistance = 0;
        while (this.board.canMove(this.currentPiece, 0, 1)) {
            this.currentPiece.y++;
            dropDistance++;
        }

        this.score += dropDistance * 2;
        this.ui.updateScore(this.score);
        this.lockPiece();
        this.draw();
    }

    rotate() {
        if (!this.isPlaying || this.isPaused || !this.currentPiece) return;

        this.currentPiece.rotate();
        if (!this.board.canMove(this.currentPiece, 0, 0)) {
            // Try wall kicks
            if (!this.tryWallKick()) {
                this.currentPiece.rotateBack();
            }
        }
        this.draw();
    }

    tryWallKick() {
        const kicks = [
            [1, 0], [-1, 0], [2, 0], [-2, 0],
            [0, -1], [1, -1], [-1, -1]
        ];

        for (const [dx, dy] of kicks) {
            if (this.board.canMove(this.currentPiece, dx, dy)) {
                this.currentPiece.x += dx;
                this.currentPiece.y += dy;
                return true;
            }
        }
        return false;
    }

    getGhostPiece() {
        const ghost = { ...this.currentPiece };
        ghost.shape = [...this.currentPiece.shape];
        
        while (this.board.canMove(ghost, 0, 1)) {
            ghost.y++;
        }
        
        return ghost;
    }

    togglePause() {
        if (!this.isPlaying) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.ui.showPauseOverlay();
        } else {
            this.ui.hidePauseOverlay();
            this.lastDropTime = Date.now();
            this.gameLoop = requestAnimationFrame(() => this.update());
        }
    }

    restart() {
        this.start();
    }

    gameOver() {
        this.isPlaying = false;
        cancelAnimationFrame(this.gameLoop);
        this.ui.showGameOver(this.score);
        this.ui.hidePauseButton();
        this.ui.showStartButton();
    }
}
