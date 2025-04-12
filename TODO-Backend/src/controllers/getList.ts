import { Request, Response } from 'express';
import TodoListModel from '../models/Todo';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await TodoListModel.findById(req.params.id);

    if (!list) {
      logger.warn('Todo list not found', { id: req.params.id });
      return handleError(res, 'List not found', 404);
    }

    logger.info('Fetched todo list successfully', { id: req.params.id });
    handleSuccess(res, 'List fetched successfully', list);
  } catch (error) {
    logger.error('Error fetching todo list', { error });
    handleError(res, 'Failed to fetch list', 500);
  }
};