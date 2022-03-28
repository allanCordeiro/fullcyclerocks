const express= require('express');
const app = express();

const port = 3000;
const config = {
    host: 'nodedb',
    user: 'root',
    password: 'root123',
    database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);
const insertData = `INSERT INTO people(name) VALUES('Aqui segue mais um nome teste')`;
connection.query(insertData);
const getData = `SELECT name FROM people`;


var peopleList = []
connection.query(getData, function(err, result) {
    if (err) throw err;
    peopleList = Object.values(JSON.parse(JSON.stringify(result)));
    console.log(peopleList);
});


connection.end();

app.set('view engine', 'pug');
app.get('/', (req, res) => {    
    res.render('index', {people: peopleList});
})

app.listen(port, () => {
    console.log('listen on ' + port);
})