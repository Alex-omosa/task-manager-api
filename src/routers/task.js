const express = require('express');
const controller = require('./../controllers/taskController');
const auth = require('./../middleware/auth');
const router = new express.Router();

router
  .route('/')
  .get(auth, controller.readTasks)
  .post(auth, controller.createTask)
  .delete(auth, controller.deleteTasks);
router
  .route('/:id')
  .get(auth, controller.readTask)
  .patch(auth, controller.updateTask)
  .delete(auth, controller.deleteTask);
module.exports = router;
