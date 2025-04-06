import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  createTask(task: Partial<Task>): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  updateTask(id: string, fields: Partial<Task>): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, fields);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }
}
