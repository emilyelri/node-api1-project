// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Node API1 Project - Emily Richard Web23');
  });

// POST to /api/users
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    console.log("user information", userInfo);
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        console.log("Please provide name and bio for the user." )
   } else {
        db.insert(userInfo)
        .then(user => {  // ❗ doesn't return user, returns id
            res.status(201).json(user)
        })
        .catch(err => {
            console.log('Error!', err);
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
    }
});

// GET from /api/users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: "The users information could not be retrieved." });
    });
});

// GET a user from /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }      
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

// DELETE from /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(count => {
        count === 1 && res.status(200).json({ message: `User was deleted.` });
        count !== 1 && res.status(404).json({ message: "The user with the specified ID does not exist." });
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: "The user could not be removed" });
    });
});

// UPDATE a user at /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newUser = req.body;

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        console.log("Please provide name and bio for the user." )
    } else {
        db.update(id, newUser)
        .then(user => {
            if (user) {
                res.status(200).json(user) // ❗ doesn't return user, returns id
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log('Error!', err);
            res.status(500).json({ error: "The user information could not be modified." });
        });
    };
});

const port = 8000;
server.listen(port, () => console.log('\n=== API on Port 8000 ===\n'));