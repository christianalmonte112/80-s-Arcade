# 80's Arcade - Tetris

A retro-styled Tetris game with neon 80's aesthetics built with vanilla JavaScript, HTML5 Canvas, and CSS3.

## Features

- 🎮 Classic Tetris gameplay
- 🌈 Vibrant 80's neon color scheme
- 👻 Ghost piece preview
- 📊 Score, level, and line tracking
- ⌨️ Keyboard controls
- 🎨 Smooth animations and effects
- 📱 Responsive design

## How to Play

### Controls
- **←** Arrow Left - Move piece left
- **→** Arrow Right - Move piece right
- **↓** Arrow Down - Soft drop (move down faster)
- **↑** Arrow Up - Rotate piece
- **Space** - Hard drop (instant drop)
- **P** - Pause/Resume game

### Game Rules
- Complete horizontal lines to score points
- Lines cleared: 1 = 100pts, 2 = 300pts, 3 = 500pts, 4 = 800pts
- Level increases every 10 lines cleared
- Game speeds up with each level
- Game ends when pieces stack to the top

## File Structure

```
80-s-Arcade/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Global styles and theme
│   ├── game.css        # Game-specific styles
│   └── animations.css  # Animation effects
├── js/
│   ├── main.js         # Application entry point
│   ├── game.js         # Core game logic
│   ├── board.js        # Board management
│   ├── piece.js        # Tetromino piece class
│   ├── constants.js    # Game constants
│   └── ui.js           # UI rendering
└── README.md           # This file
```

## Running the Game

Simply open `index.html` in a modern web browser. No build process or server required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a simple HTTP server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Technologies Used

- HTML5 Canvas for rendering
- CSS3 for styling and animations
- Vanilla JavaScript (ES6 modules)
- No external dependencies

## Browser Compatibility

Works best in modern browsers with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

## Future Enhancements

- [ ] High score persistence (localStorage)
- [ ] Sound effects and music
- [ ] Mobile touch controls
- [ ] Multiple difficulty modes
- [ ] Leaderboard system
- [ ] Additional visual effects

## License

MIT License - Feel free to use and modify!

---

Built with ❤️ and lots of neon
