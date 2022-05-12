const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/task');
const mongoose = require('mongoose');

const app = express()
// mongoose.connect('mongodb://localhost:4200/Todoapp').catch(error => handleError(error));

async function run() {
    try {
            await mongoose.connect('mongodb://localhost:4200/Todoapp');
        } catch (error) {
              handleError(error);
            }
}

run();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    //this means no matter which domain sending request it is allowed to access server
    res.setHeader("Access-Control-Allow-Origin","*");
    // allow types of headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    //allow methods that we want to make accessible
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.get('/api/tasks',(req, res)=>{
    Task.find().then(documents => {
        res.status(200).json({
            message: "Tasks received successfully",
            tasks: documents
        });
    });
   
});

app.post('/api/tasks',(req, res)=>{
    //const task = req.body;
    const task = new Task({
        title: req.body.title,
        content: req.body.content
    });
    console.log('*******Task Received', task);
    
    /*task.save();
    res.status(201).json({
        message:"Tasks stored successfully"
    });*/

    task.save().then(createdTask => {
        res.status(201).json({
          message: "Task added successfully",
          taskId: createdTask._id
        });
      });

});

app.put('/api/tasks/:id', (req, res, next)=>{
    const task = new Task({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Task.updateOne({_id: req.params.id}, task).then(result =>{
        console.log(result);
        res.status(200).json({message: "updated successfully"});
    });
});

app.delete('/api/tasks/:id', (req, res)=>{
    Task.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Task Delete!"});
    });
});

module.exports = app;
