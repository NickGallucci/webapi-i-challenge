// implement your API here
const express = require('express'); //this imports Express

const Users = require('./data/db.js');

const server = express();

server.use(express.json()); 

server.get('/', (req, res) => {
    res.send('it is running!');
})

// server.get('/api/users', (req, res) => {
//     const hobbits = [
//         {
//             id: 1,
//             name: 'Samwise Gamgee'
//         },
//         {
//             id: 2,
//             name: 'Frodo Baggins'
//         }
//     ];
//     res.status(200).json(hobbits);
// });

server.post('/api/users', (req, res) => {
    //Never trust client always validate data
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            console.log("error during POST to /user", error);
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        })
});

server.get('/api/users', (req, res) => {
    Users.find()
        .then(user => {
            console.log('Users', user);
            res.status(201).json(user)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(users => {
            if (!user){
                res.status(404).json({
                    message: "The user with the specified ID does not exist." 
                });
            } else{
                res.status(200).json(user);
            }
        })
        .catch(error => {
            console.log("error getting /user");
            res.status(500).json({
                errorMessage: "The user information could not be retrieved."
            })
        })
})

server.listen(8000, () => console.log('IT IS WORKING ON PORT 8000!!!!')); 
//^^^This declares what port the server is listening on along with showing a status message when the server is running.
