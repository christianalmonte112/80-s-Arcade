// Game constants and configurations

// Tetromino shapes (4x4 grid representation)
export const PIECES = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
};

// 80's neon color scheme for pieces
export const COLORS = {
    I: '#00f5ff',    // Neon cyan
    J: '#0080ff',    // Neon blue
    L: '#ff8c00',    // Neon orange
    O: '#ffff00',    // Neon yellow
    S: '#39ff14',    // Neon green
    T: '#8b00ff',    // Neon purple
    Z: '#ff006e'     // Neon pink
};

// Game settings
export const SETTINGS = {
    BLOCK_SIZE: 30,
    BOARD_WIDTH: 10,
    BOARD_HEIGHT: 20,
    INITIAL_DROP_SPEED: 1000,
    MIN_DROP_SPEED: 100,
    SPEED_INCREASE_PER_LEVEL: 100,
    LINES_PER_LEVEL: 10
};

// Scoring
export const POINTS = {
    SOFT_DROP: 1,
    HARD_DROP_PER_CELL: 2,
    SINGLE_LINE: 100,
    DOUBLE_LINE: 300,
    TRIPLE_LINE: 500,
    TETRIS: 800
};
