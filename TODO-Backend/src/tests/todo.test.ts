import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TodoList from '../models/Todo';
import { app } from '../app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await TodoList.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Todo API', () => {
  describe('POST /api', () => {
    it('should create a new todo list', async () => {
      const res = await request(app)
        .post('/api')
        .send({ title: 'My Todo List' });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.title).toBe('My Todo List');
      expect(res.body.data.tasks).toEqual([]);
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app).post('/api').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Title is required');
    });
  });

  describe('GET /api', () => {
    it('should fetch all todo lists', async () => {
      await TodoList.create({ title: 'Test List', tasks: [] });

      const res = await request(app).get('/api');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.lists.length).toBeGreaterThan(0);
      expect(res.body.data.lists[0].title).toBe('Test List');
    });

    it('should return an empty array if no lists exist', async () => {
      const res = await request(app).get('/api');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.lists).toEqual([]);
    });
  });

  describe('GET /api/:id', () => {
    it('should fetch a todo list by ID', async () => {
      const list = await TodoList.create({ title: 'Specific List', tasks: [] });

      const res = await request(app).get(`/api/${list._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Specific List');
    });

    it('should return 404 if the list is not found', async () => {
      const res = await request(app).get(`/api/${new mongoose.Types.ObjectId()}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('List not found');
    });
  });

  describe('POST /api/:id/tasks', () => {
    it('should add a task to a todo list', async () => {
      const list = await TodoList.create({ title: 'List with task' });

      const res = await request(app)
        .post(`/api/${list._id}/tasks`)
        .send({
          title: 'Task 1',
          description: 'First task',
          completed: false,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.tasks.length).toBe(1);
      expect(res.body.data.tasks[0].title).toBe('Task 1');
    });

    it('should return 404 if the list is not found', async () => {
      const res = await request(app)
        .post(`/api/${new mongoose.Types.ObjectId()}/tasks`)
        .send({
          title: 'Task 1',
          description: 'First task',
          completed: false,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('List not found');
    });

    it('should return 400 if task title is missing', async () => {
      const list = await TodoList.create({ title: 'List with task' });

      const res = await request(app).post(`/api/${list._id}/tasks`).send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Task title is required');
    });
  });

  describe('PATCH /api/:id/tasks/:taskId', () => {
    it('should toggle task completion', async () => {
      const list = await TodoList.create({
        title: 'Toggle List',
        tasks: [{ title: 'Toggle Task', description: '', completed: false }],
      });

      const taskId = list.tasks[0]._id;

      const res = await request(app).patch(`/api/${list._id}/tasks/${taskId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.completed).toBe(true);
    });

    it('should return 404 if the list is not found', async () => {
      const res = await request(app).patch(`/api/${new mongoose.Types.ObjectId()}/tasks/12345`);
      console.log("🚀 ~ it ~ res:", res.statusCode)
      console.log("🚀 ~ it ~ res:", res.body.message)
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('List not found');
    });

    it('should return 404 if the task is not found', async () => {
      const list = await TodoList.create({ title: 'List with no tasks', tasks: [] });

      const res = await request(app).patch(`/api/${list._id}/tasks/${new mongoose.Types.ObjectId()}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Task not found');
    });
  });
});