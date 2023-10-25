import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.css']
})
export class CreateTaskFormComponent {
  taskForm: FormGroup;
  categories: string[] = this.taskService.categories;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      task_name: ['', Validators.required],
      description: '',
      due_date: null,
      priority: '',
      category: ''
    });
  }

  onCreateTask():void {
    if (this.taskForm.valid) {
      const newTaskData = this.taskForm.value;

      this.taskService.createTask(newTaskData).subscribe(() => {
        console.log("Task created sucessfully!");
        this.taskForm.reset(); // Optionally, reset the form after submission
      });
    }
  }
  
}
