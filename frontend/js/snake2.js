'use strict';
//canvas

if(localStorage.getItem("user_loged")==null){
    window.location.href = './index.html';
}
const canvas = document.getElementById('canvas_snake');
const canvas_2d = canvas.getContext('2d');

//gerenarl function
const snakeParts = [];
let tailLength = 0;
let gameover = Boolean;
let score = 0;
let count = 0;

//function control game
function drawGame() {
    document.getElementById('score_saved').style.display = 'none';
    // hide_show.
    if (gameover == true) {
        canvas_2d.fillStyle = "red"
        canvas_2d.font = "50px Georgia";
        canvas_2d.fillText("Game over", 90, 200)
        document.getElementById('score_saved').style.display = '';
    } else {
        resetSnakeSkin();
        drawSnake();
        drawApple();
        drawWall();
        changeSnakePosition();
        drawWall_sticky();
        drawScore();

        if (score) {
            localStorage.setItem('score_2', score)
        }

        if (tailLength >= 4) {
            for (let j = 0; j < snakeParts.length; j++) {
                if (snakeParts[j].x == headX && snakeParts[j].y == headY) {
                    gameover = true;
                    drawGame();
                }
            }
        }
        if (headY == tileCount || headY < 0) {
            gameover = true;
            canvas_2d.fillStyle = "red"
            canvas_2d.font = "50px Georgia";
            canvas_2d.fillText("Game over", 90, 200)
            document.getElementById('score_saved').style.display = '';
        } else if (headX == tileCount || headX < 0) {
            gameover = true;
            canvas_2d.fillStyle = "red"
            canvas_2d.font = "50px Georgia";
            canvas_2d.fillText("Game over", 90, 200)
            document.getElementById('score_saved').style.display = '';
        }
        else {
            let speed = 8;
            setTimeout(drawGame, 1000 / speed)
        }

        if (startAppleX == headX && startAppleY == headY) {
            startAppleX = Math.floor(Math.random() * tileCount);
            startAppleY = Math.floor(Math.random() * tileSize);
            tailLength++;
            score++;
            if (tailLength == 0) {
            } else if (tailLength % 5 === 0) {
                walls.push(new wallPart(Math.floor(Math.random() * tileCount), Math.floor(Math.random() * tileSize)));
                drawWall();
            }
        }

        if (startWallX == headX && startWallY == headY) {
            gameover = true;
        }
    }
}

//If snake move, only create more pixels like the same color as tail, so this function eliminate the bad tails
function resetSnakeSkin() {
    canvas_2d.fillStyle = "black";
    canvas_2d.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;


class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//draw snake
function drawSnake() {
    //Snake body
    canvas_2d.fillStyle = localStorage.getItem("tail") || "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (startAppleX == part.x && startAppleY == part.y) {
            startAppleX = Math.floor(Math.random() * tileCount);
            startAppleY = Math.floor(Math.random() * tileSize);
            tailLength++;
            score++;
        }
        canvas_2d.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    //Add a new tail on array
    snakeParts.push(new snakePart(headX, headY));
    //If snake move, add 1 tail, but if i use shift this tail is removed on array
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    //Snake head
    canvas_2d.fillStyle = localStorage.getItem("head") || "purple";
    canvas_2d.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}


//Snake move variables
let snakeX = 0;
let snakeY = 0;

//Detect move and restric move in bad direcction
document.onkeydown = (pressKey) => {
    if (snakeY == 0) {
        if (pressKey.key == "ArrowUp") {
            snakeX = 0;
            snakeY = -1;
        }
        if (pressKey.key == "ArrowDown") {
            snakeX = 0;
            snakeY = 1;
        }
    }
    if (snakeX == 0) {
        if (pressKey.key == "ArrowLeft") {
            snakeX = -1;
            snakeY = 0;
        }
        if (pressKey.key == "ArrowRight") {
            snakeX = 1;
            snakeY = 0;
        }
    }
};

//used for detect de movement of snake and move with the position of x and y
function changeSnakePosition() {
    headX = headX + snakeX;
    headY = headY + snakeY;
}

//start the first apple of game
let startAppleX = 5;
let startAppleY = 1;

//draw apple
function drawApple() {
    canvas_2d.fillStyle = "red";
    canvas_2d.fillRect(startAppleX * tileCount, startAppleY * tileCount, tileSize, tileSize)
}

let startWallX = 10;
let startWallY = 2;
//draw wall

class wallPart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let walls = [];

function drawWall_sticky() {
    canvas_2d.fillStyle = "pink";
    canvas_2d.fillRect(startWallX * tileCount, startWallY * tileCount, tileSize, tileSize)
}

function drawWall() {
    canvas_2d.fillStyle = "pink";
    
    for (let i = 0; i < walls.length; i++) {
        let part = walls[i]
        if (startAppleX == part.x && startAppleY == part.y) {
            startAppleX = Math.floor(Math.random() * tileCount);
            startAppleY = Math.floor(Math.random() * tileSize);
        }
        if (headX == part.x && headY == part.y) {
            gameover = true;
        }
        for (let i = 0; i < snakeParts.length; i++) {
            let part_snake = snakeParts[i]
            if (part.x == part_snake.x && part.y == part_snake.y) {
                walls.pop();
                walls.push(new wallPart(Math.floor(Math.random() * tileCount), Math.floor(Math.random() * tileSize)));
            }
            canvas_2d.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        }
        canvas_2d.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

}

//Draw score
function drawScore() {
    canvas_2d.fillStyle = "white"
    canvas_2d.font = "15px verdena"
    canvas_2d.fillText("Score: " + score, canvas.clientWidth - 60, 20);
}

async function save(){
    let user = localStorage.getItem('user_loged')
    let score_2 = localStorage.getItem('score_2');
    if(localStorage.getItem('score_2')){
        const put_score = await fetch("http://localhost:3001/api/snake/",{
        method: 'PUT',
        body: JSON.stringify({
            user, score_2
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    const put_score_json = await put_score.json();
    console.log(put_score_json)
    }else{
        score_2 = 0;
    }
}

function restart() {
    window.location.reload()
}

drawGame();

function leaderboard() {
    window.location.href = './score/score2.html';
}