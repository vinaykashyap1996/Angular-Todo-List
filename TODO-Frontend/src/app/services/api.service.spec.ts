import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { IGetListsResponse, List, Task } from '../model/list-task.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:4000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch lists', () => {
    const mockResponse: IGetListsResponse = {
      success: true,
      message: 'Lists fetched successfully',
      data: {
          lists: [],
          totalLists: 0
      }
    };

    service.getLists().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a list', () => {
    const mockList: List = { _id: '1', title: 'Test List', tasks: [],taskCount: 0 };

    service.createList(mockList).subscribe((res) => {
      expect(res).toEqual(mockList);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockList);
    req.flush(mockList);
  });

  it('should create a task', () => {
    const mockTask: Task = {
      _id: 't1',
      title: 'Task 1',
      description: 'Desc',
      completed: false,
    };

    const listId = '123';
    const taskData = { title: 'Task 1', description: 'Desc' };

    service.createTask(listId, taskData).subscribe((res) => {
      expect(res).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/${listId}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(taskData);
    req.flush(mockTask);
  });

  it('should get tasks by list id', () => {
    const mockTasks: Task[] = [
      { _id: 't1', title: 'Task 1', description: 'Desc 1', completed: false },
    ];
    const listId = 'list123';

    service.getTasksByListId(listId).subscribe((res) => {
      expect(res).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/${listId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should modify a task', () => {
    const listId = 'list123';
    const taskId = 'task456';
    const mockTask: Task = {
      _id: taskId,
      title: 'Updated Task',
      description: 'Updated Desc',
      completed: true,
    };

    service.modifyTask(listId, taskId).subscribe((res) => {
      expect(res).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/${listId}/tasks/${taskId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({});
    req.flush(mockTask);
  });
});