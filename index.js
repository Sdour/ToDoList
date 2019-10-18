var express = require('express');
var body = require('body-parser');

var app = express();
app.set('view engine', 'ejs');

app.use(body.json());
app.use(body.urlencoded({ extended: true }));

var tasks = [];
var complete = [];

app.get('/', (req, res) => {
    res.render('index', { tab: tasks, com: complete });
});

app.post('/add', (req, res) => {
    var newTask = req.body.new;
    tasks.push(newTask);
    res.redirect('/');
});

app.post('/complete', (req, res) => {
    var completeTask = req.body.check;
    if (typeof completeTask === 'string') {
        tasks.splice(tasks.indexOf(completeTask), 1);
        complete.push(completeTask);
    } else if (typeof completeTask === 'object') {
        for (var i = 0; i < completeTask.length; i++) {
            tasks.splice(tasks.indexOf(completeTask[i]), 1);
            complete.push(completeTask[i]);
        }
    }
    res.redirect('/');
});

app.post('/remove', (req, res) => {
    var deleteTask = req.body.check;
    if (typeof deleteTask === 'string') {
        tasks.splice(tasks.indexOf(deleteTask), 1);
    } else if (typeof deleteTask === 'object') {
        for (var i = 0; i < deleteTask.length; i++) {
            tasks.splice(tasks.indexOf(deleteTask[i]), 1);
        }
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

