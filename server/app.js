const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

let todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

// Our routes come AFTER the data
app.get('/', (req, res) => {
    res.json({ status: "ok" });
});

app.get('/api/TodoItems', (req, res) => {
    res.json(todoItems);
});

app.get('/api/TodoItems/:number', (req, res) => {
    let itemNumber = Number(req.params.number);

    let todoItem = todoItems.find(function(todo) {
        return todo.todoItemId === itemNumber;
    });

    res.json(todoItem);
});

app.post('/api/TodoItems', (req, res) => {
    let newTodo = req.body;
    todoItems.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    let itemNumber = Number(req.params.number);

    let itemIndex = todoItems.findIndex(function(todo) {
        return todo.todoItemId === itemNumber;
    });

    let deletedItem = todoItems.splice(itemIndex, 1);

    res.json(deletedItem[0]);
});

module.exports = app;