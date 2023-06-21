import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoEditComponent } from './to-do-edit.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../../service/todo.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { of, throwError } from 'rxjs';
import { State } from '../../../api/state';
import { By } from '@angular/platform-browser';

describe('ToDoEditComponent', () => {
  let component: ToDoEditComponent;
  let fixture: ComponentFixture<ToDoEditComponent>;
  let todoService: TodoService;
  let dialogRef: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DropdownModule],
      declarations: [ToDoEditComponent],
      providers: [
        DynamicDialogRef,
        { provide: DynamicDialogConfig, useValue: { data: { todo: {} } } },
        {
          provide: TodoService,
          useValue: {
            updateTodo: jest.fn(),
            deleteTodo: jest.fn(),
          },
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = TestBed.inject(TodoService);
    dialogRef = TestBed.inject(DynamicDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with pre-existing todo's values", () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // execute the onInit lifecycle
    component.ngOnInit();

    const form: FormGroup = component.editForm;
    expect(form.get('title')?.value).toBe(mockTodo.title);
    expect(form.get('priority')?.value).toBe(mockTodo.priority);
    expect(form.get('description')?.value).toBe(mockTodo.description);
  });

  it("should initialize form with newly added todo's values", () => {
    // pass the component todo data
    const mockTodo = {
      id: 18,
      title: "new task",
      description: "",
      complete: false,
      priority: ""
    };
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // execute the onInit lifecycle
    component.ngOnInit();

    const form: FormGroup = component.editForm;
    expect(form.get('title')?.value).toBe(mockTodo.title);
    expect(form.get('priority')?.value).toBe(undefined);
    expect(form.get('description')?.value).toBe(mockTodo.description);
  });

  it ('should call updateTodo and close the dialog on valid updates to the form which is successful', () => { 
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const updateTodoSpy = jest.spyOn(todoService, 'updateTodo')
      .mockReturnValue(of(mockTodo));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // setup the reactive form
    component.ngOnInit();

    // simulate a change to form data
    component.editForm.patchValue({
      title: 'New Title'
    });
    // mark the form manually as dirty
    expect(component.editForm.valid).toBe(true);
    component.editForm.markAsDirty();

    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('#saveBtn');
    const form = fixture.nativeElement.querySelector('form');
    expect(saveButton.disabled).toBe(false);
    form.dispatchEvent(new Event('submit'));

    expect(updateTodoSpy).toHaveBeenCalledWith({
      id: 2,
      title: "New Title",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    });

    expect(closeSpy).toHaveBeenCalledWith(State.UPDATED);
  });

  it ('should call updateTodo and close the dialog on valid updates to the form which is un-successful', () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const updateTodoSpy = jest.spyOn(todoService, 'updateTodo')
      .mockReturnValue(throwError(() => 'TestError'));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // setup the reactive form
    component.ngOnInit();

    // simulate a change to form data
    component.editForm.patchValue({
      title: 'New Title'
    });
    // mark the form manually as dirty
    expect(component.editForm.valid).toBe(true);
    component.editForm.markAsDirty();

    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('#saveBtn');
    const form = fixture.nativeElement.querySelector('form');
    expect(saveButton.disabled).toBe(false);
    form.dispatchEvent(new Event('submit'));

    expect(updateTodoSpy).toHaveBeenCalledWith({
      id: 2,
      title: "New Title",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    });

    expect(closeSpy).toHaveBeenCalledWith(['TestError', State.ERROR]);
  });

  it ('should call updateTodo and should not close the dialog when no changes are made to the form', () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const updateTodoSpy = jest.spyOn(todoService, 'updateTodo')
      .mockReturnValue(of(mockTodo));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // setup the reactive form
    component.ngOnInit();

    // mark the form manually as dirty
    expect(component.editForm.valid).toBe(true);

    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('#saveBtn');
    expect(saveButton.disabled).toBe(true);
    saveButton.click();
    expect(updateTodoSpy).toHaveBeenCalledTimes(0);
    expect(closeSpy).toHaveBeenCalledTimes(0);
  });

  it ('should call updateTodo and not close the dialog on invalid updates to the form', () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const updateTodoSpy = jest.spyOn(todoService, 'updateTodo')
      .mockReturnValue(of(mockTodo));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // setup the reactive form
    component.ngOnInit();

    // simulate a change invalid change
    component.editForm.patchValue({
      title: ''
    });

    // mark the form manually as dirty
    expect(component.editForm.valid).toBe(false);

    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('#saveBtn');
    expect(saveButton.disabled).toBe(true);
    saveButton.click();
    expect(updateTodoSpy).toHaveBeenCalledTimes(0);
    expect(closeSpy).toHaveBeenCalledTimes(0);
  });

  it ('should call deleteTodo and close the dialog on a successful delete', () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const deleteTodoSpy = jest.spyOn(todoService, 'deleteTodo')
      .mockReturnValue(of({}));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // instantiate the form itself
    component.ngOnInit();

    // trigger the delete button
    component.deleteTodo();    
    expect(deleteTodoSpy).toHaveBeenCalledWith(mockTodo.id);
    expect(closeSpy).toHaveBeenCalledWith(State.DELETED);
  });

  it ('should call deleteTodo and close the dialog on a un-successful delete', () => {
    // pass the component todo data
    const mockTodo = {
      id: 2,
      title: "Buy groceries 1",
      description: "Get fruits, vegetables, and other essentials",
      complete: false,
      priority: "Medium",
    };
    
    // spy on the todo service
    const deleteTodoSpy = jest.spyOn(todoService, 'deleteTodo')
      .mockReturnValue(throwError(() => 'error message'));
    const closeSpy = jest.spyOn(dialogRef, 'close');    
    const config = TestBed.inject(DynamicDialogConfig);
    config.data.todo = mockTodo;

    // instantiate the form itself
    component.ngOnInit();

    // trigger the delete button
    component.deleteTodo();    
    expect(deleteTodoSpy).toHaveBeenCalledWith(mockTodo.id);
    expect(closeSpy).toHaveBeenCalledWith(['error message', State.ERROR]);
  });
});
