import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskFormComponent } from './create-task-form.component';

describe('CreateTaskFormComponent', () => {
  let component: CreateTaskFormComponent;
  let fixture: ComponentFixture<CreateTaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskFormComponent]
    });
    fixture = TestBed.createComponent(CreateTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
