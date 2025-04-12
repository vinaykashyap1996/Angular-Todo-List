import { Request, Response } from 'express';
import TodoListModel from '../models/Todo';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoListModel.findById(req.params.id);

    if (!list) {
      logger.warn('Todo list not found for adding task', { id: req.params.id });
      return handleError(res, 'List not found', 404);
    }

    if (!req.body.title) {
      logger.warn('Task title is required', { body: req.body });
      return handleError(res, 'Task title is required', 400);
    }
    
    list.tasks.push(req.body);
    await list.save();

    logger.info('Added task to todo list', { listId: req.params.id, task: req.body });
    handleSuccess(res, 'Task added successfully', list, 201);
  } catch (error) {
    logger.error('Error adding task to todo list', { error });
    handleError(res, 'Failed to add task', 500);
  }
};