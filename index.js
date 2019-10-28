// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Node 23!');
  });

// POST to /api/users
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    console.log("user information", userInfo);

    db.insert(userInfo)
    .then(userID => {
        res.json(userID)
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: 'Failed to add a user to database.' });
    });
});

// GET from /api/users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: 'Failed to fetch users from database.' });
    });
});

// GET a user from /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db. findById(id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: 'Failed to fetch user from database.' });
    });
});

// DELETE from /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(count => {
        res.status(200).json({ message: `User was deleted.` });
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: 'Failed to delete user from database.' });
    });
});

// UPDATE a user at /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newUser = req.body;

    db.update(id, newUser)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log('Error!', err);
        res.status(500).json({ error: 'Failed to update user in database.' });
    });
});

const port = 8000;
server.listen(port, () => console.log('\n=== API on Port 8000 ===\n'));