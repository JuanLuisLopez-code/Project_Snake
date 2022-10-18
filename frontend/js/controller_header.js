'use strict';

const log_out = () => {
    localStorage.removeItem('user_loged');
    window.location.href = './index.html';
}

const select_game = () => {
    localStorage.setItem('game', document.getElementById('select_game').value);
    if (localStorage.getItem("game") == 1) {
        window.location.href = './snake.html';
    } else if (localStorage.getItem("game") == 2) {
        window.location.href = './snake2.html';
    } else if (localStorage.getItem("game") == 3) {
        window.location.href = './snake3.html';
    }
}

const select_head = () => {
    localStorage.setItem('head', document.getElementById('select_head').value);
}

const select_tail = () => {
    localStorage.setItem('tail', document.getElementById('select_tail').value);
}