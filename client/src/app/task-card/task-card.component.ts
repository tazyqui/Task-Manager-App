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

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  editTask() {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '400px',
      data: { task: this.task }, // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe((editedTask) => {
      
      if (editedTask) {
        // Handle dialog close
        console.log(this.task);
        console.log(editedTask); 
        // Call a service method to update the task
        this.taskService.updateTask(editedTask).subscribe((updatedTask) => {
          // Handle the updated task here (e.g., refresh the UI)
          this.task = updatedTask; // Update the task data in your component
          
        });
      }
    });
  }

  deleteTask() {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        // Handle deletion success (e.g., remove the task from UI)
        // You can also trigger a refresh of your task list here if needed
      });
    }
  }
}
