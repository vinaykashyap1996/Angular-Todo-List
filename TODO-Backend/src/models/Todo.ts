import mongoose, { Schema, Document } from 'mongoose';
import { ITask, ITodoList } from './TodoModelTypes';


// Define the Task schema
const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

// Define the Todo List schema
const TodoListSchema = new Schema<ITodoList>({
  title: { type: String, required: true },
  tasks: [TaskSchema],
});

const TodoListModel = mongoose.model<ITodoList>('TodoList', TodoListSchema);
export default TodoListModel;