//create web server
import express from 'express';
const app = express();
import { json, urlencoded } from 'body-parser';
import { readFileSync } from 'fs';

//read file
let comments = JSON.parse(readFileSync('comments.json'));

//parse data
app.use(json());
app.use(urlencoded({ extended: true }));

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

