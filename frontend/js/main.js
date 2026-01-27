// Main entry point for Tetris game
import { Game } from './game.js';
import { UI } from './ui.js';

class TetrisApp {
    constructor() {
        this.game = null;
        this.ui = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize UI
        this.ui = new UI();

        // Initialize game
        this.game = new Game(this.ui);

        // Setup event listeners
        this.setupEventListeners();

        console.log('Tetris game initialized!');
    }

    setupEventListeners() {
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.game.start());
        }

        // Pause button
        const pauseBtn = document.getElementById('pause-btn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.game.togglePause());
        }

        // Restart button
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.game.restart());
        }

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(event) {
        // Prevent default browser behavior for game keys
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
            event.preventDefault();
        }

        if (!this.game) return;

        switch(event.key) {
            case 'ArrowLeft':
                this.game.moveLeft();
                break;
            case 'ArrowRight':
                this.game.moveRight();
                break;
            case 'ArrowDown':
                this.game.softDrop();
                break;
            case 'ArrowUp':
                this.game.rotate();
                break;
            case ' ':
                this.game.hardDrop();
                break;
            case 'p':
            case 'P':
                this.game.togglePause();
                break;
        }
    }
}

// Initialize the app
const app = new TetrisApp();
