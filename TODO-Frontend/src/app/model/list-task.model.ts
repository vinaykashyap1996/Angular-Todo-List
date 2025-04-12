export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface List {
  _id: string;
  title: string;
  tasks: Task[];
  taskCount: number;
}

export interface ListState {
  lists: List[];
  loading: boolean;
  error: string | null;
}

export interface IGetListsResponse {
  success: boolean;
  message: string;
  data: {
      lists: List[];
      totalLists: number;
  };
}

export interface ICreateListResponse {
  success: boolean;
  message: string;
  data: {
      list: List;
  };
}