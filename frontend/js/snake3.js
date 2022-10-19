'use strict';
//canvas
const canvas = document.getElementById('canvas_snake');
const canvas_2d = canvas.getContext('2d');

//gerenarl function
const snakeParts = [];
let tailLength = 0;
let gameover = Boolean;
let score = 0;
let new_moveX = 0;
let new_moveY = 0;
localStorage.removeItem('lastMove')

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
        changeSnakePosition();
        drawScore();
        drawDelete();
        drawRandom();
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

        if (startAppleX == startDeleteX && startAppleY == startDeleteY) {
            startDeleteX = Math.floor(Math.random() * tileCount);
            startDeleteY = Math.floor(Math.random() * tileSize);
        } else if (startAppleX == startRandomX && startAppleY == startRandomY) {
            startRandomX = Math.floor(Math.random() * tileCount);
            startRandomY = Math.floor(Math.random() * tileSize);
        }

        if (startDeleteX == headX && startDeleteY == headY) {
            startDeleteX = Math.floor(Math.random() * tileCount);
            startDeleteY = Math.floor(Math.random() * tileCount);
            deleteLast();
        }

        if (startRandomX == headX && startRandomY == headY) {
            startRandomX = Math.floor(Math.random() * tileCount);
            startRandomY = Math.floor(Math.random() * tileSize);
            moveRandom();
        }

        if (startDeleteX == startRandomX && startDeleteY == startRandomY) {
            startRandomX = Math.floor(Math.random() * tileCount);
            startRandomY = Math.floor(Math.random() * tileSize);
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
    snakeParts.push(new snakePart(headX, headY));
    //Add a new tail on array
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
            localStorage.setItem('lastMove', "Up")
        }
        if (pressKey.key == "ArrowDown") {
            snakeX = 0;
            snakeY = 1;
            localStorage.setItem('lastMove', "Down")
        }
    }
    if (snakeX == 0) {
        if (pressKey.key == "ArrowLeft") {
            snakeX = -1;
            snakeY = 0;
            localStorage.setItem('lastMove', "Left")
        }
        if (pressKey.key == "ArrowRight") {
            snakeX = 1;
            snakeY = 0;
            localStorage.setItem('lastMove', "Right")
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

//start the first apple of game

let startDeleteX = Math.floor(Math.random() * tileCount);
let startDeleteY = Math.floor(Math.random() * tileCount);
//draw delete_tail
function drawDelete() {
    canvas_2d.fillStyle = "brown";
    canvas_2d.fillRect(startDeleteX * tileCount, startDeleteY * tileCount, tileSize, tileSize)
}

function deleteLast() {
    tailLength --;
    if(tailLength < 0){
        tailLength = 0;
    }
    snakeParts.pop()
}

//start the first apple of game
let startRandomX = Math.floor(Math.random() * tileCount);
let startRandomY = Math.floor(Math.random() * tileCount);
//draw random_move
function drawRandom() {
    canvas_2d.fillStyle = "brown";
    canvas_2d.fillRect(startRandomX * tileCount, startRandomY * tileCount, tileSize, tileSize)
}

function moveRandom() {
    if (localStorage.getItem('lastMove')) {
        new_moveX = Math.floor(Math.random() * 2)
        new_moveY = Math.floor(Math.random() * 2)
        if (new_moveX == 0) {
            new_moveX = -1
        }
        if (new_moveY == 0) {
            new_moveY = -1
        }
        for (let i = 0; i < 3; i++) {
            headX = headX - new_moveX;
        }
        for (let j = 0; j < 3; j++) {
            headY = headY - new_moveY;
        }
    }
}

//Draw score
function drawScore() {
    canvas_2d.fillStyle = "white"
    canvas_2d.font = "15px verdena"
    canvas_2d.fillText("Score: " + score, canvas.clientWidth - 60, 20);
}

//function for score, and add a new score in a session
let show_table_score = "";
let show_table = [];
let cadena = "";

//Score only can use in this session if close navigator or delete coockies then the score reset

//Add a new score in a session
function Submit() {
    //check if localStorage exist,if not create for dont crash the game
    if (!localStorage.getItem("score")) {
        localStorage.setItem("score", JSON.stringify([]))
    }
    show_table = JSON.parse(localStorage.getItem("score"));
    show_table.push([{ "Name": document.getElementsByClassName('name')[0].value, "score": score }])
    localStorage.setItem("score", JSON.stringify(show_table));

    const inside_div = document.querySelector("#score_saved");
    const p_show = document.createElement('p');
    inside_div.appendChild(p_show);

    //Add the new score on localStorage
    for (let k = 0; k < show_table.length; k++) {
        cadena = cadena + "<p>" + "Name:  " + show_table[k][0].Name + "Score: " + show_table[k][0].score + "</p>";
    }
    p_show.innerHTML = cadena;
}

function restart() {
    window.location.reload()
}

drawGame();