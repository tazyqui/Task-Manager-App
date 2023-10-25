import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task: Task = {} as Task;

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  editTask(): void {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '400px',
      data: { task: this.task }, // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe((editedTask) => {
      // Call a service method to update the task
      this.taskService.updateTask(editedTask).subscribe(() => {
        console.log("Task updated sucessfully!")
      });
    });
  }

  deleteTask(): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        console.log("Task deleted sucessfully!")
      });
    }
  }
}
