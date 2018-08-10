const express = require('express');
const app = express();

const fs = require('fs');

function callLog(url) {
    return console.log('API call done: ', url);
}

app.get('/data/*', function (req, res) {
    callLog(req.url);
    let data = fs.readFileSync('.' + req.url, { encoding: 'utf8' });
    res.json(JSON.parse(data));
});

app.get('/logos/*', function (req, res) {
    callLog(req.url);
    let data = fs.readFileSync('.' + req.url);
    res.end(data);
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});