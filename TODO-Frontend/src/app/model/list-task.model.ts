export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
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
  };
}

export interface ICreateListResponse {
  success: boolean;
  message: string;
  data: {
      list: List;
  };
}