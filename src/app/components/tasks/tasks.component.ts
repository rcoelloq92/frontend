import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  standalone: true,
  imports: [
    CommonModule,     
    ReactiveFormsModule
  ]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: ['']
    });

    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((data) => {
      this.tasks = data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    });
  }

  addTask() {
    if (this.taskForm.invalid) return;
    const { title, description } = this.taskForm.value;

    this.tasksService.createTask({ title, description }).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
    });
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task.id!, {
      completed: task.completed
    }).subscribe();
  }

  editTask(task: Task) {
    const newTitle = prompt('Nuevo título', task.title);
    const newDesc = prompt('Nueva descripción', task.description);
    if (newTitle !== null && newDesc !== null) {
      this.tasksService.updateTask(task.id!, {
        title: newTitle,
        description: newDesc
      }).subscribe(() => this.loadTasks());
    }
  }

  deleteTask(taskId?: string) {
    if (!taskId) return;
    this.tasksService.deleteTask(taskId).subscribe(() => this.loadTasks());
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  trackById(index: number, item: Task) {
    return item.id;
  }
}
