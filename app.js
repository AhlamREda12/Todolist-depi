const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let tasks = [
  { text: 'buy dog food', completed: false },
  { text: 'read the book ', completed: false },
  { text: 'call my parents', completed: false },
  { text: 'clean my working place', completed: false },
  { text: 'What do you want?', completed: true }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
  const newTask = { text: req.body.task, completed: false };
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/delete-task', (req, res) => {
  const taskIndex = req.body.taskIndex;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.post('/toggle-complete', (req, res) => {
  const taskIndex = req.body.taskIndex;
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.redirect('/');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/remove-task', (req, res) => {
tasks = tasks.filter(task => !task.completed);
res.redirect('/');
});

app.get('/edit-task', (req, res) => {
    const taskIndex = parseInt(req.query.taskIndex, 10);
    
    if (!isNaN(taskIndex) && tasks[taskIndex]) {
        res.render('edit', { taskIndex: taskIndex, task: tasks[taskIndex] });
    } else {
        res.redirect('/');
    }
});

app.post('/update-task', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex, 10);
    const updatedTaskText = req.body.updatedTask;
    
    if (!isNaN(taskIndex) && tasks[taskIndex]) {
        tasks[taskIndex].text = updatedTaskText; 
    }
    
    res.redirect('/');
});