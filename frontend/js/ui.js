// UI rendering and updates
import { SETTINGS } from './constants.js';

export class UI {
    constructor() {
        this.canvas = document.getElementById('tetris-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('next-piece-canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        this.blockSize = SETTINGS.BLOCK_SIZE;
        
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.startButton = document.getElementById('start-btn');
        this.pauseButton = document.getElementById('pause-btn');

        this.pauseOverlay = null;
    }

    clearCanvas() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard(board) {
        for (let row = 0; row < board.height; row++) {
            for (let col = 0; col < board.width; col++) {
                const cellValue = board.getCell(col, row);
                if (cellValue !== 0) {
                    this.drawBlock(col, row, cellValue, 1.0);
                }
            }
        }
    }

    drawPiece(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    this.drawBlock(piece.x + col, piece.y + row, piece.color, 1.0);
                }
            }
        }
    }

    drawGhostPiece(ghostPiece) {
        for (let row = 0; row < ghostPiece.shape.length; row++) {
            for (let col = 0; col < ghostPiece.shape[row].length; col++) {
                if (ghostPiece.shape[row][col]) {
                    this.drawBlock(ghostPiece.x + col, ghostPiece.y + row, ghostPiece.color, 0.2);
                }
            }
        }
    }

    drawBlock(x, y, color, alpha = 1.0) {
        const pixelX = x * this.blockSize;
        const pixelY = y * this.blockSize;

        // Draw main block
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = alpha;
        this.ctx.fillRect(pixelX + 1, pixelY + 1, this.blockSize - 2, this.blockSize - 2);

        // Draw highlight for 3D effect
        if (alpha > 0.5) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(pixelX + 1, pixelY + 1, this.blockSize - 2, this.blockSize / 3);

            // Draw shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(pixelX + 1, pixelY + this.blockSize - this.blockSize / 3, 
                            this.blockSize - 2, this.blockSize / 3 - 1);
        }

        // Draw glow effect
        if (alpha > 0.5) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 10;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(pixelX + 1, pixelY + 1, this.blockSize - 2, this.blockSize - 2);
            this.ctx.shadowBlur = 0;
        }

        this.ctx.globalAlpha = 1.0;
    }

    drawNextPiece(piece) {
        // Clear next piece canvas
        this.nextCtx.fillStyle = '#1a1a2e';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

        // Calculate centering offset
        const offsetX = (this.nextCanvas.width - piece.shape.length * this.blockSize) / 2;
        const offsetY = (this.nextCanvas.height - piece.shape.length * this.blockSize) / 2;

        // Draw the piece
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const x = offsetX + col * this.blockSize;
                    const y = offsetY + row * this.blockSize;

                    this.nextCtx.fillStyle = piece.color;
                    this.nextCtx.fillRect(x + 1, y + 1, this.blockSize - 2, this.blockSize - 2);

                    // Add glow
                    this.nextCtx.shadowColor = piece.color;
                    this.nextCtx.shadowBlur = 10;
                    this.nextCtx.strokeStyle = piece.color;
                    this.nextCtx.lineWidth = 1;
                    this.nextCtx.strokeRect(x + 1, y + 1, this.blockSize - 2, this.blockSize - 2);
                    this.nextCtx.shadowBlur = 0;
                }
            }
        }
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
        this.scoreElement.classList.add('score-popup');
        setTimeout(() => {
            this.scoreElement.classList.remove('score-popup');
        }, 300);
    }

    updateLevel(level) {
        this.levelElement.textContent = level;
    }

    updateLines(lines) {
        this.linesElement.textContent = lines;
    }

    showGameOver(score) {
        this.finalScoreElement.textContent = score;
        this.gameOverElement.classList.remove('hidden');
    }

    hideGameOver() {
        this.gameOverElement.classList.add('hidden');
    }

    showPauseButton() {
        this.pauseButton.classList.remove('hidden');
    }

    hidePauseButton() {
        this.pauseButton.classList.add('hidden');
    }

    showStartButton() {
        this.startButton.classList.remove('hidden');
    }

    hideStartButton() {
        this.startButton.classList.add('hidden');
    }

    showPauseOverlay() {
        if (!this.pauseOverlay) {
            this.pauseOverlay = document.createElement('div');
            this.pauseOverlay.className = 'game-over pause-overlay';
            this.pauseOverlay.innerHTML = '<h2>PAUSED</h2><p>Press P to resume</p>';
            document.querySelector('.game-area').appendChild(this.pauseOverlay);
        }
        this.pauseOverlay.classList.remove('hidden');
    }

    hidePauseOverlay() {
        if (this.pauseOverlay) {
            this.pauseOverlay.classList.add('hidden');
        }
    }
}
