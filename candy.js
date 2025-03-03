var candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];

var board = [];
var rows = 9
var columns = 9
var score = 0

var curruntTile;
var otherTile; 

window.onload = function(){
        startGame()

        window.setInterval(function(){
            crushCandy()
            slideCandy()
        }, 100)


}

function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)]
}

function startGame(){
    for (let r = 0 ; r < rows ; r++){
        let row = []
        for (let c = 0 ; c <  columns ; c++){
            // <img id="0-0" src="imgs/Blue.png">
            let tile = document.createElement("img")
            tile.id = r.toString()+ "-" + c.toString()
            tile.src = "imgs/"+ randomCandy() + ".png"
            // drag functionality
            tile.addEventListener("dragstart", dragStart) // inititalize drag process
            tile.addEventListener("dragover", dragOver) // moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter) // dragging the candy to the target tile
            tile.addEventListener("dragleave", dragLeave) // leave candy over another candy
            tile.addEventListener("dragend", dragEnd) // dropping a candy over another candy
            tile.addEventListener("drop", dragDrop) // swapping candies

            document.getElementById("board").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
}

function dragStart(){
    // refers the tile that was clcked on for dragging
    curruntTile = this;
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(){ 
}

function dragDrop(){
    // refers the tile that was dropped the candy
    otherTile = this
}

function dragEnd(){

    if (curruntTile.src.includes("pink") || otherTile.src.includes("pink")){
        return
    }

    let currCoods = curruntTile.id.split("-")
    let r = parseInt(currCoods[0])
    let c =  parseInt(currCoods[1])

    let otherCoods = otherTile.id.split("-")
    let r2 = parseInt(otherCoods[0])
    let c2 = parseInt(otherCoods[1])

    let moveLeft = c2 == c-1 && r == r2
    let moveRight = c2 == c+1 && r == r2
    let moveUp = r2 == r-1 && c == c2 
    let moveDown = r2 == r+1 && c == c2
    
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown

    if (isAdjacent){
        // getting the src of the candies that initially clicked and dropped
        let currImg = curruntTile.src
        let otherImg = otherTile.src
        // swapping
        curruntTile.src = otherImg
        otherTile.src = currImg
    

        let validMove = checkValid()

        if (!validMove){
            let currImg = curruntTile.src
            let otherImg = otherTile.src
            curruntTile.src = otherImg
            otherTile.src = currImg
        }
    }

}

function crushCandy(){
    crushThree();
    document.getElementById("score").innerText = score
}

function crushThree(){
    // check rows
    for (let r = 0; r < rows ; r++){
        for (let c = 0; c < columns - 2; c++){
            let candy1 = board[r][c].src
            let candy2 = board[r][c+1].src
            let candy3 = board[r][c+2].src

            if (candy1 == candy2 && candy2 == candy3){
                board[r][c].src = "imgs/pink.png"
                board[r][c+1].src = "imgs/pink.png"
                board[r][c+2].src = "imgs/pink.png"
                score += 30
            }
        }
    }

    // check columns
    for (let r = 0; r < rows - 2; r++){
        for (let c = 0; c < columns; c++){
            let candy1 = board[r][c].src
            let candy2 = board[r+1][c].src
            let candy3 = board[r+2][c].src

            if (candy1 == candy2 && candy2 == candy3){
                board[r][c].src = "imgs/pink.png"
                board[r+1][c].src = "imgs/pink.png"
                board[r+2][c].src = "imgs/pink.png"
                score += 30
            }
        }
    }
}

function checkValid(){
    // check rows
    for (let r = 0; r < rows ; r++){
        for (let c = 0; c < columns - 2; c++){
            let candy1 = board[r][c].src
            let candy2 = board[r][c+1].src
            let candy3 = board[r][c+2].src

            if (candy1 == candy2 && candy2 == candy3){
                return true
            }
        }
    }

    // check columns
    for (let r = 0; r < rows - 2; r++){
        for (let c = 0; c < columns; c++){
            let candy1 = board[r][c].src
            let candy2 = board[r+1][c].src
            let candy3 = board[r+2][c].src

            if (candy1 == candy2 && candy2 == candy3){
                return true
            }
        }
    }
    return false
}

function slideCandy(){
    for (let c =0; c < columns; c++){
        let index = rows - 1
        for (let r = columns - 1; r >= 0; r--){
            if (!board[r][c].src.includes("pink")){
                board[index][c].src = board[r][c].src
                index -= 1
            }
        }
        for (let r = index; r >= 0; r--){
            board[r][c].src = "imgs/"+ randomCandy() + ".png"
        }
    }
}
    
    