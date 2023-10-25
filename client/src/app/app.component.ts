import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Task Manager';
  sortingOption: string = "priority";
  
  //
  applySorting(sortingOption:string): void{
    this.sortingOption = sortingOption;
  }
}
