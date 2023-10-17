import express from 'express';
import { Task } from '../models/taskModel.js';

const router = express.Router();

// Route for Save a new Task
router.post('/', async (request, response) => {
  try {
    console.log(request.body);
    if (
      !request.body.title ||
      !request.body.type ||
      !request.body.message
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, type, Deadline ,message',
      });
    }
    const newTask = {
      title: request.body.title,
      type: request.body.type,
      deadline: request.body.deadline,
      message: request.body.message,
    };

    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All tasks from database
router.get('/', async (request, response) => {
  try {
    const tasks = await Task.find({});

    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One task from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id);

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a task
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.type ||
      !request.body.deadline ||
      !request.body.message
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, type, Deadline, message',
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'task not found' });
    }

    return response.status(200).send({ message: 'task updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a task
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'task not found' });
    }

    return response.status(200).send({ message: 'task deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
