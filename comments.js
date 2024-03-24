//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//read file
let comments = JSON.parse(fs.readFileSync('comments.json'));

//parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//get comment by id
app.get('/comments/:id', (req, res) => {
    let comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found.');
    }
    res.send(comment);
});

