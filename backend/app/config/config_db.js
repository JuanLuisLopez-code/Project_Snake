const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function get_users() {
    let db_users = [
        {
            username: "Pepito",
            password: "Pepito",
            score_1: 20,
            score_2: 15,
            score_3: 9
        },
        {
            username: "a",
            password: "a",
            score_1: 40,
            score_2: 4,
            score_3: 10
        },
        {
            username: "b",
            password: "b",
            score_1: 10,
            score_2: 16,
            score_3: 2
        }
    ]

    const result = await fetch('https://rickandmortyapi.com/api/character')
    const json = await result.json();
    const users = json['results'].map(p => {
        let user = {};
        user.username = p.name;
        user.password = p.name;
        user.score_1 = Math.floor(Math.random() * 20);
        user.score_2 = Math.floor(Math.random() * 20);
        user.score_3 = Math.floor(Math.random() * 20);
        return user;
    })
    global.users = [...db_users, ...users];
}

module.exports = get_users;