import { Request, Response } from 'express';
import mongoose from 'mongoose';
import TodoListModel from '../models/Todo';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';

export const toggleTask = async (req: Request, res: Response): Promise<void> => {
  const { id, taskId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('Invalid list ID for toggling task', { id });
      return handleError(res, 'Invalid list ID', 400);
    }

    const list = await TodoListModel.findById(id);

    if (!list) {
      logger.warn('Todo list not found for toggling task', { id });
      return handleError(res, 'List not found', 404);
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      logger.warn('Invalid task ID for toggling', { taskId });
      return handleError(res, 'Invalid task ID', 400);
    }

    const task = list.tasks.find((task) => task._id?.toString() === taskId);

    if (!task) {
      logger.warn('Task not found in list for toggling', { listId: id, taskId });
      return handleError(res, 'Task not found', 404);
    }

    task.completed = !task.completed;
    await list.save();

    logger.info('Toggled task completion status', { listId: id, taskId, completed: task.completed });
    handleSuccess(res, 'Task toggled successfully', task);
  } catch (error) {
    logger.error('Error toggling task completion status', { error });
    handleError(res, 'Failed to toggle task', 500);
  }
};