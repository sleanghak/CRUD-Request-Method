
const express = require('express');
const app = express();

app.listen(process.env.PORT || 8080, () => console.log("Server Running..."));

// accept json
app.use(express.json());

// Capture object
app.use(express.urlencoded());


// GET Method
app.get('/', (req, res) => res.send("Welcome GET POST PUT DELETE Methods !"))

const users = [
    {
        id: 1,
        username: "Vann",
        password: '123',
    },
    {
        id: 2,
        username: "Vary",
        password: '456',
    },
    {
        id: 3,
        username: "Vanna",
        password: '789',
    },
    {
        id: 4,
        username: "Hak",
        password: '123',
    },
    {
        id: 5,
        username: "Houy",
        password: '456',
    },
    {
        id: 6,
        username: "Hong",
        password: '789',
    },
];



// GET Method
app.get('/api/users', (req, res) => res.send(users));


// POST Method
app.post('/api/users', (req, res) => {

    if (!req.body.password) {
        res.status(404);
        return res.send({ error: "Password Requires. Please Enter a Password!" })
    }

    console.log(req.body.username);

    const user = {

        id: users.length + 1,
        username: req.body.username,
        password: req.body.password,
    }

    users.push(user);
    res.send(users);
});

// PUT Method || 

app.put('/api/users/:id', (req, res) => {

    const id = req.params.id;
    const userName = req.body.username;
    const pass = req.body.password;
    console.log(id);
    let index = -1;

    for (const user of users) {
        if (user.id === parseInt(id)) {
            index = user.id - 1;
        }
    }

    if (index >= 0) {
        const user = users[index];
        console.log(user);

        // Capture the new values we have updated
        user.username = userName;
        user.password = pass;

        res.send(user);

    } else {

        res.status(404)
        res.send({ error: "Uesr id not correct!" })
    }
})

// DELETE Method || លុបតាម ID

app.delete('/api/users/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);
    let index = -1;

    for (const user of users) {
        if (user.id === parseInt(id)) {
            index = user.id - 1;
        }
    }

    if (index >= 0) {

        const user = users[index];
        console.log(user);

        // Catching Id and Delet
        users.splice(index, 1);

        // Displaying results on the screen
        res.send(user);

    } else {
        res.status(404)
        res.send({ error: "Uesr id not correct!" })
    }
});