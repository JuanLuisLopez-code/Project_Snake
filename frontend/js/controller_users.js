'use strict'

if(localStorage.getItem('user_loged')){
    window.location.href = './snake.html';
}

const button_login = () => {
    let input_username = document.getElementById('user').value;
    let input_password = document.getElementById('password').value;
    login(input_username,input_password);
}

const button_register = () => {
    let input_username = document.getElementById('user').value;
    let input_password = document.getElementById('password').value;
    register(input_username,input_password);
}