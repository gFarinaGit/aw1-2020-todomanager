
'use strict';

// DAO module for accessing courses and exams
// Data Access Object 

const sqlite = require('sqlite3');
const db = new sqlite.Database('../db/tasks.db', (err) => {
  if (err) throw err;
});

exports.listTasks = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => (
          { id: e.id,
            description: e.description,
            important: e.important,
            private: e.private,
            project: e.project,
            deadline: e.deadline,
            completed: e.completed,
          }));
      resolve(tasks);
    });
  });
};

exports.readTaskById = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve(undefined);
      } else {
        const task = {
          id: row.id,
          description: row.description,
          important: row.important,
          private: row.private,
          project: row.project,
          deadline: row.deadline,
          completed: row.completed,
        };
        resolve(task);
      }
    });
  });
};

exports.getLastId = function() {
  return new Promise((resolve, reject) =>{
    const sql = 'SELECT id FROM tasks ORDER BY id DESC';
    db.get(sql, (err, row) => {
      if(err){
        reject(err);
        return;
      }
      let a = row.id
      resolve(a);
    });
  });
};

exports.createTask = function(task) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tasks(id, description, project, important, private, deadline, completed) VALUES(?, ?, ? , ?, ?, DATE(?), ?)';
    db.run(sql, [task.id, task.description, task.project, task.important, task.private, task.deadline, task.completed], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(task.id);
    });
  });
};

exports.updateTask = function (task) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET description = ?, project = ?, important = ?, private = ?, deadline = DATE(?), completed = ? WHERE id = ?';
    db.run(sql, [task.description, task.project, task.important, task.private, task.deadline, task.completed, task.id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(task.id);
    });
  });
};

exports.completeTask = function (id) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET completed = 1 WHERE id = ?';
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(id);
    });
  });
};

exports.deleteTask = function (id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(id);
    });
  });
};

exports.filterTasks = function (filter) {
  return new Promise((resolve, reject) => {
    let sql;
    switch (filter) {
      case "all":
        sql = 'SELECT id FROM tasks';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      case "important":
        sql = 'SELECT id FROM tasks WHERE important = 1';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      case "private":
        sql = 'SELECT id FROM tasks WHERE private = 1';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      case "shared":
        sql = 'SELECT id FROM tasks WHERE private = 0';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      case "today":
        sql = 'SELECT id FROM tasks WHERE DATE(deadline) = CURRENT_DATE;';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      case "next7days":
        sql = 'SELECT id FROM tasks WHERE DATE(deadline) >= DATE(CURRENT_DATE, \'+1 DAY\') AND DATE(deadline) <= DATE(CURRENT_DATE, \'+7 DAY\');';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows.map( (e) => ({ id: e.id }) ));
        });
        break;
      default:
        resolve(undefined);
        break;
    }
  });
}

exports.listProjects = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT project FROM tasks';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows.filter( (e) => e.project !== null )
                  .map( (e) => ({ project: e.project }) ));
    });
  });
}

exports.filterTasksByProject = function (project) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id FROM tasks WHERE project = ?';
    db.all(sql, [project], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows.map( (e) => ({ id: e.id }) ));
    });
  });
}