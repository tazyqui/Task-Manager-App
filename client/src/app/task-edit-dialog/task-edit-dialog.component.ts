import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css']
})
export class TaskEditDialogComponent implements OnInit {
  taskForm: FormGroup;
  categories: string[] = this.taskService.categories;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskEditDialogComponent>
  ) {
    this.taskForm = this.formBuilder.group({
      task_name: ['', Validators.required],
      description: [''],
      due_date: null,
      priority: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.taskForm.patchValue({
        task_name: this.data.task.task_name,
        description: this.data.task.description,
        due_date: this.data.task.due_date,
        priority: this.data.task.priority,
        category: this.data.task.category
      });
    }
  }

  onSaveClick(): void {
    if (this.taskForm.valid) {
      // Include the ID in the edited data
      const editedTaskData = {
        id: this.data.task.id, // Include the ID
        ...this.taskForm.value // Include other form values
      };
      this.dialogRef.close(editedTaskData); // Close the dialog and pass the edited data
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
