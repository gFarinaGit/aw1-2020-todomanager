const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation library
const dao = require('./dao.js');

const app = express();
const port = 3000;

// Set-up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());

// Set-up the 'client' component as a static website
app.use(express.static('../client'));
app.get('/', (req, res) => res.redirect('/index.html'));

// REST API endpoints

// [GET] [/tasks]
// [Retrieve the list of all available tasks]
// [Request body: empty]
// [Response body: array of objects describing a task]
// [Errors: {} Database Empty
//          500 Internal Server Error]
app.get('/tasks', (req, res) => {
  dao.listTasks()
      .then((tasks) => { res.json(tasks); })
      .catch(() => { res.status(500).end(); });
});

// [GET] [/tasks/<task_id>]
// [Retrieve a task, given its id]
// [Request body: empty]
// [Response body: object describing a task]
// [Errors: 404 Not Found -> id does not exist
//          500 Internal Server Error]
app.get('/tasks/:id', (req, res) => {
  dao.readTaskById(req.params.id)
      .then((task) => {
          if(task === undefined) res.status(404).end();
          else res.json(task);
      })
      .catch(() => { res.status(500).end(); });
});

// [POST] [/tasks]
// [Create a new task, by providing all relevant information]
// [Request body: object describing a task (without id)]
// [Response body: id of the new Task]
// [Errors: 422 Unprocessable Entity -> invalid parameters
//          503 Service Unavailable]
app.post('/tasks', [
  check('description').isLength({min: 1}),
  check('project').optional().isString(),
  check('important').isBoolean(),
  check('private').isBoolean(),
  check('deadline').optional().isISO8601(),
  // check('completed').isBoolean(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({errors: errors.array()});
  dao.getLastId().then( (id) => {
      dao.createTask({
      id: id+1,
      description: req.body.description,
      project: req.body.project,
      important: req.body.important,
      private: req.body.private,
      deadline: req.body.deadline,
      completed: 0,
    }).then((result) => res.json(id+1))
        .catch( () => res.status(503).end() );
  });
});

// [PUT] [/tasks/<task_id>]
// [Update an existing task, by providing all relevant information]
// [Request body: object with data to update]
// [Response body: id of the updated Task]
// [Errors: 404 Not Found -> id does not exist
//          422 Unprocessable Entity -> invalid parameters
//          500 Internal Server Error
//          503 Service Unavailable]
app.put('/tasks/:id', [
    check('description').optional().isLength({min: 1}),
    check('project').optional().isString(),
    check('important').optional().isBoolean(),
    check('private').optional().isBoolean(),
    check('deadline').optional().isISO8601(),
],(req, res) => {
  dao.readTaskById(req.params.id)
      .then((task) => {
          if(task === undefined) res.status(404).end();
          task.description = req.body.description;
          task.project = req.body.project;
          task.important = req.body.important;
          task.private = req.body.private;
          task.deadline = req.body.deadline;
    dao.updateTask(task).then((result) => res.json(task))
            .catch( () => res.status(503).end() );
      })
      .catch(() => { res.status(500).end(); });
});

// [DELETE] [/tasks/<task_id>]
// [Delete a task, given its id]
// [Request body: empty]
// [Response body: empty]
// [Errors: 404 Not Found -> id does not exist
//          500 Internal Server Error
//          503 Service Unavailable]
app.delete('/tasks/:id', (req, res) => {
    dao.readTaskById(req.params.id).then( (result) => {
        if(result === undefined) res.status(404).end();
        dao.deleteTask(req.params.id).then( () => res.end() )
        .catch( () => res.status(503).end() );
    })
    .catch( () => res.status(500).end() );
});

// [PUT] [/tasks/<task_id>/completed]
// [Mark a task as completed]
// [Request body: empty]
// [Response body: id of the completed task]
// [Errors: 404 Not Found -> id does not exist
//          500 Internal Server Error
//          503 Service Unavailable]
app.put('/tasks/:id/completed',(req, res) => {
    dao.readTaskById(req.params.id).then( (result) => {
        if(result === undefined) res.status(404).end();
        dao.completeTask(req.params.id).then( () => res.json(req.params.id))
        .catch( () => res.status(503).end() );
    })
    .catch( () => res.status(500).end() );
});

// [GET] [/filter/<name>]
// [Retrieve the list of ids of filtered tasks]
// [Request body: empty]
// [Response body: array of ids]
// [Errors: {} -> no entries with required filter
//          422 Unprocessable Entity -> filter does not exist
//          500 Internal Server Error]
app.get('/filter/:name', (req, res) => {
    dao.filterTasks(req.params.name).then( (result) =>{
        if(result === undefined) res.status(422).end();
        else res.json(result)
    })
    .catch( () => res.status(500).end() );
});

// [GET] [/projects]
// [Retrieve the list of projects]
// [Request body: empty]
// [Response body: array of strings with names of projects]
// [Errors: {} -> No projects in Database
//          500 Internal Server Error]
app.get('/projects', (req, res) => {
    dao.listProjects().then((result) => res.json(result))
        .catch( () => res.status(500).end() );
});

// [GET] [/projects/<name>]
// [Retrieve the list of ids of tasks with that project]
// [Request body: empty]
// [Response body: array of ids]
// [Errors: 404 Not Found -> project does not exist
//          500 Internal Server Error]
app.get('/projects/:name', (req, res) => {
    dao.filterTasksByProject(req.params.name).then((result) => {
        if(result.length) res.json(result);
        else res.status(404).end();
    })
    .catch( () => res.status(500).end() );
});

// Activate web server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
