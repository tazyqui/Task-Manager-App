import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingTasksFormComponent } from './sorting-tasks-form.component';

describe('SortingTasksFormComponent', () => {
  let component: SortingTasksFormComponent;
  let fixture: ComponentFixture<SortingTasksFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingTasksFormComponent]
    });
    fixture = TestBed.createComponent(SortingTasksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
