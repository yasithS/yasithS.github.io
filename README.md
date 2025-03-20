# not-candyCrush

https://notcandycrush.netlify.app
A browser-based match-three puzzle game inspired by Candy Crush Saga. Match colorful candies in rows or columns of three to earn points!

<img width="1512" alt="game-screenshot" src="https://github.com/user-attachments/assets/fbc5b4e8-62b1-49b7-9ba8-815fc845ce11" />

## Description

not-candyCrush is a simple web-based puzzle game built with HTML, CSS, and vanilla JavaScript. The gameplay involves swapping adjacent candies to create matches of three or more of the same color. When matches are formed, the candies are crushed, and new candies fall from the top to fill the gaps.

## Features

- 9x9 grid of colorful candies
- Drag and drop functionality for swapping candies
- Score tracking
- Match detection in rows and columns
- Gravity effect as candies fall to fill empty spaces
- Responsive design

## How to Play

1. **Objective**: Create matches of three or more identical candies in a row or column.
2. **Controls**: Click and drag a candy to swap it with an adjacent candy.
3. **Scoring**: Each match of three candies earns you 30 points.
4. **Rules**:
   - You can only swap candies with adjacent ones (up, down, left, or right).
   - A swap is only valid if it creates at least one match of three or more candies.
   - Invalid moves will be automatically reversed.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Yasith-Gunawardhana/candy.git
   ```

2. Navigate to the project directory:
   ```
   cd candy
   ```

3. Open the `index.html` file in your web browser to start playing.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Google Fonts (Archivo Black)

## Directory Structure

```
candy/
│
├── imgs/            # Game images (candy sprites and background)
├── index.html       # Main HTML file
├── candy.js         # Game logic
└── candy.css        # Styling
```

## Game Logic

- `startGame()`: Initializes the game board with random candies
- `dragStart()`, `dragDrop()`, `dragEnd()`: Handle the drag and drop functionality
- `crushCandy()`: Detects and removes matches
- `slideCandy()`: Implements the gravity effect, making candies fall into empty spaces
- `checkValid()`: Validates moves to ensure they create matches

## Future Enhancements

- Special candies for matching four or five in a row
- Time-based gameplay mode
- Multiple levels with increasing difficulty
- Sound effects and background music
- Mobile-friendly touch controls

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Yasith Gunawardhana

---

Enjoy the game and happy candy crushing!
