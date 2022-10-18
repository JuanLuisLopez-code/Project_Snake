'use strict';
//canvas
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
        changeSnakePosition();
        drawScore();



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

//draw wall

class wallPart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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