import { Request, Response } from 'express';
import TodoListModel from '../models/Todo';
import { handleError, handleSuccess } from '../utils/responseHandler';
import logger from '../utils/logger';

export const getLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists = await TodoListModel.find();
    const listsWithTaskCount = lists.map((list) => ({
      ...list.toObject(),
      taskCount: list.tasks?.length || 0,
    }));

    logger.info('Fetched all todo lists successfully');
    handleSuccess(res, 'Lists fetched successfully', {
      totalLists: lists.length,
      lists: listsWithTaskCount,
    });
  } catch (error) {
    logger.error('Error fetching todo lists', { error });
    handleError(res, 'Failed to fetch lists', 500);
  }
};