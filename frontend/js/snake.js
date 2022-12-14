'use strict';
if(localStorage.getItem("user_loged")==null){
    window.location.href = './index.html';
}
//canvas
const canvas = document.getElementById('canvas_snake');
const canvas_2d = canvas.getContext('2d');

//gerenarl function
const snakeParts = [];
let tailLength = 0;
let gameover = Boolean;
let score = 0;

//function control game
function drawGame() {
    document.getElementById('score_saved').style.display = 'none';
    // hide_show.
    if (gameover == true) {
        canvas_2d.font = "50px Georgia";
        canvas_2d.fillText("Game over", 90, 200)
        document.getElementById('score_saved').style.display = '';
    } else {
        resetSnakeSkin();
        drawSnake();
        drawApple();
        changeSnakePosition();
        drawScore();
        if (score) {
            localStorage.setItem('score_1', score)
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
            // localStorage.setItem('touch', "touch")
            startAppleX = Math.floor(Math.random() * tileCount);
            startAppleY = Math.floor(Math.random() * tileSize);
            tailLength++;
            score++;
            console.log("Tocado")
            // localStorage.removeItem("touch")
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
//Draw score
function drawScore() {
    canvas_2d.fillStyle = "white"
    canvas_2d.font = "15px verdena"
    canvas_2d.fillText("Score: " + score, canvas.clientWidth - 60, 20);
}

function restart() {
    window.location.reload()
}

async function save(){
    let user = localStorage.getItem('user_loged')
    let score_1 = localStorage.getItem('score_1');
    if(localStorage.getItem('score_1')){
        const put_score = await fetch("http://localhost:3001/api/snake/",{
        method: 'PUT',
        body: JSON.stringify({
            user, score_1
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    const put_score_json = await put_score.json();
    console.log(put_score_json)
    }else{
        score_1 = 0;
    }
}

drawGame();

function leaderboard() {
    window.location.href = './score/score.html';
}