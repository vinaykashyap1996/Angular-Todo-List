import { Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
  }
  
  export interface ITodoList extends Document {
    title: string;
    tasks: ITask[];
  }