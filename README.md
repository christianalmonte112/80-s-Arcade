# 80's Arcade - Retro Gaming Platform
## Product Requirements Document

**Author:** Yaasameen & Jonel  
**Status:** DRAFT  
**Updated:** 1/26/2026  

**PM:** yaasameen@80sarcade.com

---

## 1. PROBLEM & OPPORTUNITY

### Problem
Modern retro gaming compilations lack the simplicity and authenticity of original 1980s arcade experiences. Current versions include excessive features and simplified mechanics that eliminate the strategic depth and pure gameplay of classics like NES/Game Boy Tetris and original Snake. Players seeking nostalgic, skill-rewarding gameplay with authentic mechanics and meaningful competition cannot find a true retro arcade experience online that brings multiple classic games together under one roof.

### Vision
**"Bring back authentic 80's arcade gaming with a curated collection of classic titles - starting with NES/Game Boy Tetris and original Snake - where users can enjoy guilt-free nostalgia, master strategic depth, compete globally and with friends, and build their gaming legacy across multiple games."**

### Opportunity
- Growing retro gaming market and nostalgia economy
- Multi-game platform increases engagement and retention
- Unified leaderboard system across games drives competition
- Strategic depth through authentic mechanics (Tetris scoring, Snake growth)
- Social competition via Global, Weekly, and Friends leaderboards
- Expandable platform for additional retro games (Pac-Man, Space Invaders, etc.)
- Level 29 "kill screen" in Tetris and progressive difficulty in Snake
- Maximum scores: Tetris (999,999), Snake (based on grid fills)

### Target Users
1. **80's/90's Arcade Nostalgia Seekers** - Adults who played classic arcade games
2. **Competitive Gamers** - Players seeking authentic scoring and rankings across games
3. **Social Players** - Users who compete with friends across multiple games
4. **Strategic Players** - Gamers mastering game-specific strategies
5. **Puzzle & Skill Game Enthusiasts** - Players seeking progressive difficulty
6. **Challenge Seekers** - Players attempting kill screens and high scores

### Market Differentiation
- **Pure arcade authenticity** - Original mechanics for each game
- **Multi-game platform** - Unified experience across classic titles
- **Strategic depth** - Rewards skillful play in each game
- **Focused competition** - Three leaderboards per game (Global, Weekly, Friends)
- **Unified social system** - One friend list, compete across all games
- **80's aesthetic** - Consistent neon retro design across platform
- **Free, accessible** - Web-based, no downloads

---

## 2. SOLUTION & GOALS

### Platform Architecture

**80's Arcade Hub Model:**
```
┌─────────────────────────────────────────┐
│         80'S ARCADE MAIN MENU           │
│                                         │
│  ┌─────────────┐    ┌─────────────┐   │
│  │   TETRIS    │    │    SNAKE    │   │
│  │  [SELECT]   │    │  [SELECT]   │   │
│  └─────────────┘    └─────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     UNIFIED LEADERBOARDS        │   │
│  │   [GLOBAL] [WEEKLY] [FRIENDS]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      PROFILE & FRIENDS          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Top 6 MVP Value Props

**1. Multi-Game Arcade Platform** 🎮 (Steroid)
- Unified hub with multiple classic games
- Consistent 80's arcade aesthetic across all games
- Single profile system across games
- Seamless game switching
- Game selection menu with Tetris and Snake

**2. Authentic Tetris Experience** ⚡ (Vitamin + Painkiller)
- Original NES/Game Boy BPS scoring: Single (40), Double (100), Triple (300), Tetris (1200) × (level+1)
- Authentic speed progression matching NES/Game Boy gravity
- Level 29 "kill screen" challenge
- Maximum score: 999,999

**3. Authentic Snake Experience** 🐍 (Vitamin + Painkiller)
- Original Snake mechanics (continuous movement, grid-based)
- Food collection grows snake length
- Wall collision = game over
- Self-collision = game over
- Progressive speed increase with length
- Score = length × multiplier

**4. Unified Competitive System** 🏆 (Steroid)
- **Per-Game Leaderboards:**
  - Global Leaderboard (all-time per game)
  - Weekly Leaderboard (resets Monday, per game)
  - Friends Leaderboard (per game)
- **Unified Profile Stats:**
  - Total games across platform
  - Favorite game tracking
  - Best scores per game
- Track game-specific metrics (Tetris Rate, Snake Length)

**5. Cross-Game Social Features** 👥 (Steroid)
- Single friend system across all games
- Challenge friends to beat scores in specific games
- Unified friend leaderboard showing best game per friend
- Profile shows stats for all games
- One username across entire platform

**6. Intuitive Game-Specific Controls** 🎮 (Vitamin)
- **Tetris:** Arrow keys (move/rotate), Spacebar (rotate), Enter (hard drop), Down (soft drop)
- **Snake:** Arrow keys only (change direction)
- **Universal:** P (pause), ESC (return to menu)

---

## Platform Goals

### Primary Goals
1. **Create unified retro arcade platform** - Multiple authentic games under one brand
2. **Enable strategic mastery per game** - Reward skillful play in each game's mechanics
3. **Build cross-game community** - Enable competition across multiple games
4. **Provide scalable architecture** - Easy to add new games (Pac-Man, Breakout, etc.)
5. **Deliver consistent nostalgia** - Uniform 80's aesthetic and UX patterns
6. **Appeal to broad audience** - Different games attract different player types

### Non-Goals
- Modern game features (power-ups, special modes not in originals)
- Cross-game scoring or combined leaderboards
- Mobile touch controls (MVP = keyboard only)
- Monetization features (ads, in-app purchases)
- Sound/music (post-MVP)
- Games beyond Tetris and Snake in MVP

---

## 3. GAME SPECIFICATIONS

### Game 1: Tetris (NES/Game Boy Authentic)

**Core Mechanics:**
- 10×20 grid
- 7 tetromino types (I, O, T, S, Z, J, L)
- Classic NES colors
- Original rotation system

**Scoring System (BPS):**
```
Single line:   40 × (level + 1)
Double lines: 100 × (level + 1)
Triple lines: 300 × (level + 1)
Tetris (4):  1200 × (level + 1)
Soft drop:     +1 per grid space
Max score:   999,999
```

**Level & Speed:**
- Starting level: 0-19 (selectable)
- Level up: Every 10 lines
- Speed: NES gravity table (48 frames @ L0 → 1 frame @ L29)
- Level 29: Kill screen

**Game-Specific Stats:**
- Tetris count (4-line clears)
- Tetris rate (percentage)
- Lines cleared
- Starting level

---

### Game 2: Snake (Original Arcade Style)

**Core Mechanics:**
- Grid-based movement (20×20 or 25×25 grid)
- Snake starts at 3 segments
- Food appears randomly on empty cells
- Eating food: +1 segment length, +points
- Continuous movement (doesn't stop)
- Direction changes only (can't reverse into self)

**Collision Rules:**
- Wall collision → Game Over
- Self-collision → Game Over
- Food collision → Grow + Score

**Scoring System:**
```
Base points per food:  10 points
Speed multiplier:      ×1 at start
                       ×1.5 at length 10
                       ×2 at length 20
                       ×2.5 at length 30
                       ×3 at length 50+

Score = (food_collected × 10) × speed_multiplier
Perfect game (fill grid): Bonus ×2
Max theoretical score: ~15,000
```

**Speed Progression:**
- Initial speed: 8 moves/second
- Speed increase: Every 5 food items
- Speed tiers:
  - Length 0-9:   8 moves/sec
  - Length 10-19: 10 moves/sec
  - Length 20-29: 12 moves/sec
  - Length 30-49: 15 moves/sec
  - Length 50+:   18 moves/sec (max)

**Game-Specific Stats:**
- Max snake length
- Food collected
- Perfect game achieved (yes/no)
- Survival time

**Controls:**
- Arrow Up: Move up
- Arrow Down: Move down
- Arrow Left: Move left
- Arrow Right: Move right
- P: Pause
- ESC: Return to menu

**Visual Design:**
- Snake: Neon green (#00FF00)
- Food: Neon pink (#FF00FF)
- Grid: Dark with subtle lines
- Background: Same gradient as Tetris

---

## 4. PLATFORM ARCHITECTURE

### Main Menu / Game Selection Screen

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│                  80'S ARCADE                        │
│            [Neon Pink, Glowing Title]               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              SELECT YOUR GAME                        │
│                                                      │
│  ┌────────────────────┐  ┌────────────────────┐   │
│  │                    │  │                    │   │
│  │      TETRIS        │  │      SNAKE         │   │
│  │                    │  │                    │   │
│  │   [Game Icon]      │  │   [Game Icon]      │   │
│  │                    │  │                    │   │
│  │   High: 245,680    │  │   High: 8,450      │   │
│  │   Rank: #23        │  │   Rank: #45        │   │
│  │                    │  │                    │   │
│  │   [PLAY]           │  │   [PLAY]           │   │
│  │                    │  │                    │   │
│  └────────────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              QUICK ACTIONS                          │
│  [LEADERBOARDS]  [PROFILE]  [FRIENDS]              │
└─────────────────────────────────────────────────────┘
```

---

## File Structure

```
80-s-Arcade/
├── README.md           # This PRD document
└── frontend/
    ├── index.html      # Main HTML file
    ├── css/
    │   ├── styles.css      # Global styles and theme
    │   ├── game.css        # Game-specific styles
    │   └── animations.css  # Animation effects
    └── js/
        ├── main.js         # Application entry point
        ├── game.js         # Core game logic
        ├── board.js        # Board management
        ├── piece.js        # Tetromino piece class
        ├── constants.js    # Game constants
        └── ui.js           # UI rendering
```

---

## Running the Game

Simply open `frontend/index.html` in a modern web browser. No build process or server required!

```bash
# Option 1: Open directly
open frontend/index.html

# Option 2: Use a simple HTTP server (recommended)
cd frontend
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Development Team Distribution (3 People)

### **Person 1: Platform Architecture & Tetris Lead**
**Responsibilities:**
- Main menu / game selection system
- Navigation routing (menu ↔ games)
- Shared UI component library
- Platform state management
- Complete Tetris game (all mechanics, scoring, levels)
- Tetris-specific stats tracking
- Integration with leaderboards (Tetris)

### **Person 2: Snake Game & Visual Design Lead**
**Responsibilities:**
- Complete Snake game (all mechanics, scoring, speed)
- Snake-specific stats tracking
- Integration with leaderboards (Snake)
- Platform-wide visual design system
- 80's arcade aesthetic (menus, games, screens)
- Game cards on main menu
- Animations and transitions

### **Person 3: Data, Social & Leaderboards Lead**
**Responsibilities:**
- Unified profile system (cross-game)
- Per-game leaderboard systems (6 total: 3 for Tetris, 3 for Snake)
- Friends system (shared across games)
- localStorage architecture (per-game + shared)
- Data synchronization
- Weekly reset system (per game)
- Stats aggregation (platform-wide + per-game)

---

## Success Metrics

| Goal | Metrics | Targets |
|------|---------|---------|
| **Platform Engagement** | Multi-game adoption rate<br>Session length<br>Games per session | >60% play both games<br>>15 min avg session<br>>2.5 games/session |
| **Game-Specific Engagement** | Tetris DAU<br>Snake DAU | >800 Tetris DAU<br>>600 Snake DAU |
| **Social Engagement** | Friends/user<br>Cross-game challenges | >5 friends/user<br>>80 challenges/week |
| **Retention** | 1-week retention<br>MoM growth | >65% retention<br>>15% growth |

---

## Future Expansion

### Additional Games (Post-MVP)
- **Pac-Man** - Authentic maze layout, ghost AI, power pellets
- **Space Invaders** - Wave-based progression, alien patterns
- **Breakout** - Paddle physics, brick layouts, power-ups

### Platform Features (Post-MVP)
- Platform-wide tournaments
- Seasonal events
- "Arcade Champion" meta-leaderboard
- Daily challenges per game
- Achievement showcase
- Spectator mode

---

Built with ❤️ and lots of neon
