const express = require('express');
const app = express();

const fs = require('fs');

var routes = require('./routes');
app.use('/', routes);

app.get('/src/img/images2.json', function (req, res) {
    console.log('ho fatto la chiamata');
    fs.readFile('C:/Users/Administrator/Documents/project/city_presentation/src/img/images2.json', 'utf8', function (err, data) {
        let obj = JSON.parse(data);
        let objStr = JSON.stringify(obj);
        res.json(objStr);
    });
});

app.listen(4001, () => {
    console.log('App listening on port 4001');
});