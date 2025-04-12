import { Request, Response } from 'express';
import TodoListModel from '../models/Todo';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';


export const createList = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.title) {
      logger.warn('Title is required for creating a todo list');
      return handleError(res, 'Title is required', 400);
    }
    const newList = new TodoListModel({ title: req.body.title });
    await newList.save();

    logger.info('Created a new todo list', { title: req.body.title });
    handleSuccess(res, 'List created successfully', newList, 201);
  } catch (error) {
    logger.error('Error creating todo list', { error });
    handleError(res, 'Failed to create list', 500);
  }
};