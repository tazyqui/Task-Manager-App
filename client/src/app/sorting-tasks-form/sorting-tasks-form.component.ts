import { Component, Output, EventEmitter} from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-sorting-tasks-form',
  templateUrl: './sorting-tasks-form.component.html',
  styleUrls: ['./sorting-tasks-form.component.css']
})
export class SortingTasksFormComponent {
  selectedSortOption: string = 'priority';

  constructor(private taskService: TaskService) { }

  onSortingOptionChange():void {
    // Update the sorting option via TaskService
    this.taskService.setSortingOption(this.selectedSortOption);
  }

}
