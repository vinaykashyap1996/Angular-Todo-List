import express, {Router} from 'express';
import { getLists } from '../controllers/getLists';
import { createList } from '../controllers/createList';
import { getList } from '../controllers/getList';
import { addTask } from '../controllers/addTask';
import { toggleTask } from '../controllers/toggleTask';


const router: Router = express.Router();

// GET all to-do lists
router.get('/', getLists);

// POST new to-do list
router.post('/', createList);

// GET a specific to-do list by ID
router.get('/:id', getList);

// POST a new task to a specific list
router.post('/:id/tasks', addTask);

// PATCH (toggle) task completion
router.patch('/:id/tasks/:taskId', toggleTask);

export default router;
