/*
    ==================
    Title: mclaurine-employee-routes.js,
    Author: Trevor McLaurine
    Date: 10/25/2023
    Description: Initializes the routes used for the Employee API
*/

const express = require('express')
const Employee = require('../models/McLaurine-employee')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * createEmployee
 * @openapi
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     name: createEmployees
 *     summary: Creates a new customer for the Employees API
 *     requestBody:
 *       description: Information about the employee
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - position
 *               - empId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               empId:
 *                 type: String
 *     responses:
 *       '200':
 *         description: Customer added to NodeShopper API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/employees', async (req,res) => {
    //Grabs information from the req.body function to initialize variables.
    const { name, position, empId } = req.body; 
    console.log(req.body)

    try{
        //creates a new customer. Checks to see if all parameters are met
        const newEmployee = await Employee.create({ name, position, empId })
        if(!newEmployee){
            //if all parameters are not met, throws an error
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            //if successful, creates a new customer
            res.status(200).json(newEmployee);
        }
    }
    catch (error) {
        //if the request is bad, throws an error
        res.status(501).json({ 'message': `Server Exception: ${error.message}` })
    }
})

/**
 * findAllEmployees
 * @openapi
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     description: Returns a list of all employees from the Employees API database
 *     summary: Returns the data for all of the employees
 *     operationid: findAllEmployees
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Employees API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/employees', async (req,res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being.

    // try {
    //     await People.find({}, function(err, people) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(people);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    // TODO: add a try and catch

    //Searches the database for all teams
    const employees = await Employee.find({ })

    //returns the teams that are found
    res.status(200).json(employees);
})

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     description: Returns a specific employee designated by the user input. The employee is retrieved by grabbing an id from the url parameters.
 *     summary: Returns the data for a specific employee.
 *     operationid: findEmployeeById
 *     responses:
 *       '200':
 *         description: "Successful retrieval of a document containing the employee"
 *       '400':
 *         description: "Bad Request"
 *       '404':
 *         description: "Not Found"
 *       '500':
 *         description: "Server exceptions"
 */

router.get('/employees/:empId', async (req, res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being.

    // try {
    //     employee.findOne({'_id':req.params.id}, function(err, employees) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(employees);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    //grabs the id from the URL parameters
    // const { employeeID } = req.params;

    //searches for employee based on the id variable.
    const employee = await Employee.findOne({ 'empId': req.params.empId })

    if(!employee)
    {
        //if there is no employee with that id, returns status 404 and a message that employee can't be found
        return res.status(404).json({error: "No employee can be found"});
    }
    //if successful, returns employee object
    res.status(200).json(employee);
})

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     summary: Creates a new task and apply it to the appropriate employee
 *     parameters:
 *      - name: empId
 *        in: path
 *        required: true
 *        description: Id for employee
 *        schema: 
 *          type: string
 *     requestBody:
 *       description: Information about the task
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - date
 *               - description
 *               - importance
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               description:
 *                 type: string
 *               importance: 
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description:  New invoice created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/employees/:empId/tasks', async (req, res) => {

    try{
        // searches for a user based on the parameters written by the user
        const employee = await Employee.findOne({ 'empId': req.params.empId })
        console.log(req.params.empId)
        console.log(employee)
        if(!employee){
            // if no user is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a user is found, a new invoice object is created and initialized with the req.body values
            const newTask = {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description,
                importance: req.body.importance, 
                status: req.body.status, 
                taskId: req.body.taskId
            }   
            console.log(newTask)
            // pushes the new object into an array already placed in the user's data
            employee.tasks.push(newTask)
            
            //saves the new data to the database
            employee.save()
            res.status(200).json(employee)
        }
    }
    catch (error) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    }
})

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description: Returns a list of tasks that the employee has
 *     summary: Returns a list of tasks
 *     parameters:
 *       - name: EmployeeID
 *         in: path
 *         required: true
 *         description: Employee ID that the employee has. 
 *         schema: 
 *           type: string
 *     operationid: findAllTasks
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Employee API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/employees/:empId/tasks', async (req,res) => {
    try {
        //searches for a user in the database
        const employee = await Employee.findOne({ 'empId': req.params.empId })
        if(!employee){
            //if no user is found, throws an error
            res.status(501).send({ 'message': 'Mongo Exception Error'})
        }
        else
        {
            //if successful, sets status to 200 and returns the customer.
            res.status(200).json(employee); 
        }
    }
    catch(e) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

/**
 * deleteTask
 * @openapi
 * /api/teams/{empId}/tasks/:taskId:
 *   delete:
 *     tags:
 *       - Tasks
 *     name: deleteTask
 *     description: Deletes a task by ID
 *     summary: Removes a task from an employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to be removed from the API.
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Task deleted
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/employees/:empId/tasks/:taskId', async (req, res) => {
    try {

        await Employee.findOneAndUpdate(
            { empId: req.params.empId }, 
            { $pull: { tasks: { taskId: req.params.taskId }}}, 
            { safe: true, multi: false}
        )
        return res.status(200).json({ message: 'Task deleted successfully '})
    }
    catch (e) {
        //if anything goes wrong, throws an error
        res.status(500).json({ error: `Server Exception ${e.message}` })
    }
})

/**
 * updateTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employee
 *     name: updateTasks
 *     description: Updates an existing employee's tasks document
 *     summary: Updates the information of tasks of an employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the employee to update. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Employee information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - date
 *               - description
 *               - importance
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               description:
 *                 type: string
 *               importance:
 *                 type: string
 *               status: 
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee updated
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/employees/:empId/tasks/:taskId', async (req, res) => {
    const tasks = req.body

    try{
        await Employee.updateOne(
            { empId: req.params.empId, tasks: {$elemMatch: {taskId: req.params.taskId }} }, 
            { $set:  { 
                'tasks.$.name' : tasks.name,  
                'tasks.$.date': tasks.date, 
                'tasks.$.description': tasks.description, 
                'tasks.$.importance': tasks.importance, 
                'tasks.$.status': tasks.status,
                'tasks.$.taskId': req.params.taskId 
            } }
        )

        return res.status(200).json({ message: "Task updated"})
        
        
        
        // const employee = Employee.findOne({ empId: req.params.empId })
        // if(!employee) {
        //     return res.status(501).send(response)
        // } 
        // employee.set({ 
        //     tasks
        // })
        
    }
    catch (error) {
        //throws an error if something goes wrong
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;