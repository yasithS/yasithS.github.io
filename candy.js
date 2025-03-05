var candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];

var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var curruntTile;
var otherTile;

window.onload = function () {
    startGame();
    playBackgroundMusic(); 

    window.setInterval(function () {
        crushCandy();
        slideCandy();
    }, 100);
};

function playBackgroundMusic() {
    const bgMusic = new Audio("audio/Art of Silence.mp3"); 
    bgMusic.loop = true;
    
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
    });
    
    document.body.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
        }
    });
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "imgs/" + randomCandy() + ".png";
            
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("dragend", dragEnd);
            tile.addEventListener("drop", dragDrop);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    curruntTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (curruntTile.src.includes("pink") || otherTile.src.includes("pink")) {
        return;
    }

    let currCoods = curruntTile.id.split("-");
    let r = parseInt(currCoods[0]);
    let c = parseInt(currCoods[1]);

    let otherCoods = otherTile.id.split("-");
    let r2 = parseInt(otherCoods[0]);
    let c2 = parseInt(otherCoods[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
    
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = curruntTile.src;
        let otherImg = otherTile.src;
        curruntTile.src = otherImg;
        otherTile.src = currImg;
    
        let validMove = checkValid();
        if (!validMove) {
            curruntTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r][c + 1].src;
            let candy3 = board[r][c + 2].src;

            if (candy1 == candy2 && candy2 == candy3) {
                board[r][c].src = "imgs/pink.png";
                board[r][c + 1].src = "imgs/pink.png";
                board[r][c + 2].src = "imgs/pink.png";
                score += 30;
            }
        }
    }
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r + 1][c].src;
            let candy3 = board[r + 2][c].src;

            if (candy1 == candy2 && candy2 == candy3) {
                board[r][c].src = "imgs/pink.png";
                board[r + 1][c].src = "imgs/pink.png";
                board[r + 2][c].src = "imgs/pink.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r][c + 1].src;
            let candy3 = board[r][c + 2].src;
            if (candy1 == candy2 && candy2 == candy3) {
                return true;
            }
        }
    }
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r + 1][c].src;
            let candy3 = board[r + 2][c].src;
            if (candy1 == candy2 && candy2 == candy3) {
                return true;
            }
        }
    }
    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let index = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("pink")) {
                board[index][c].src = board[r][c].src;
                index -= 1;
            }
        }
        for (let r = index; r >= 0; r--) {
            board[r][c].src = "imgs/" + randomCandy() + ".png";
        }
    }
}
