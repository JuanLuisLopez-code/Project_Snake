'use strict'

async function seeAll() {
    const see = await fetch("http://localhost:3001/api/snake");
    const see2 = await see.json();
    return see2;
}

async function login(input_username, input_password) {
    const log_call = await fetch("http://localhost:3001/api/snake/" + JSON.stringify(input_username) + "/" + JSON.stringify(input_password));
    const log_json = await log_call.json();
    console.log(log_json)
    if (log_json == null) {
        alert('This user not exist')
    } else {
        localStorage.setItem('user_loged', JSON.stringify(log_json.username));
        window.location.href = './snake.html';
    }
}

async function register(input_username, input_password) {
    const register_call = await fetch("http://localhost:3001/api/snake/", {
        method: 'POST',
        body: JSON.stringify({
            input_username, input_password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const register_json = await register_call.json();
    console.log(register_json)
    if (register_json == 'User_already_exist') {
        alert("User already exist");
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
    } if (register_json == "Registered") {
        localStorage.setItem('user_loged', JSON.stringify(input_username));
        window.location.href = './snake.html';
    }
}