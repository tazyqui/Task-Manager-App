import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  sortingOption: string = "priority";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Subscribe to taskList$ and sortingOption
    this.taskService.taskListSubject.subscribe((tasks) => {
      this.tasks = tasks;
      this.applySorting();
    });
  
    this.taskService.sortingOptionSubject.subscribe((sortingOption) => {
      this.sortingOption = sortingOption;
      this.applySorting();
    });
  
    // Load tasks after setting up subscriptions
    this.loadTasks();
  }
  

  loadTasks(): void {
    this.taskService.getTasks().subscribe(); // No need to manually update tasks, they will be updated through the subscription.
  }

  applySorting(): void {
    if (this.sortingOption === 'priority') {
      const priorityOrder: { [key: string]: number } = { High: 0, Medium: 1, Low: 2, None: 3 };
      this.tasks = this.tasks.slice().sort((a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (this.sortingOption === 'category') {
      this.tasks = this.tasks.slice().sort((a, b) => {
        const categoryA = a.category ?? '';
        const categoryB = b.category ?? '';
        return categoryA.localeCompare(categoryB);
      });
    } else if (this.sortingOption === 'due_date') {
      this.tasks = this.tasks.slice().sort((a, b) => {
        const dateA = a.due_date ? new Date(a.due_date) : new Date(0); 
        const dateB = b.due_date ? new Date(b.due_date) : new Date(0);
        return dateA.getTime() - dateB.getTime();
      });
      
    }
  }
}
