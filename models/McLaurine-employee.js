/*
    ==================
    Title: mclaurine-employee.js,
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the composer schema
*/

const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    "name": {
        type: String
    },
    "date": {
        type: String
    },
    "description": {
        type: String
    },
    "importance": {
        type: String
    }, 
    "status": {
        type: String
    }, 
    "taskId": {
        type: String
    }
})

//initializes the composer Schema
const employeeSchema = new mongoose.Schema({
    "name":
    {
        type: String,
    },
    "empId":
    {
        type: String,
    },
    "tasks": {
        type: [tasksSchema]
    }
});

//exports the schema
module.exports = mongoose.model('Employee', employeeSchema);