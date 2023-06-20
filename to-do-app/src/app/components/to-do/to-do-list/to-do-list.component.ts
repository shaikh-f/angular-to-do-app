import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Todo } from 'src/app/api/todo';
import { TodoService } from '../../../service/todo.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToDoEditComponent } from '../to-do-edit/to-do-edit.component';
import { State } from '../../../api/state';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit, OnDestroy {

  todos!: Todo[];
  errMessage!: string;
  ref: DynamicDialogRef | undefined;
  subscriptions: Subscription[] = [];
  todoForm!: FormGroup;
  @ViewChild(Table) table!: Table;

  constructor(private todoService: TodoService,
              public dialogService: DialogService,
              private messageService: MessageService,
              private fBuilder: FormBuilder) {}

  private _initializeTodo(): Todo {
    return {
      id: null,
      title: '',
      description: '',
      complete: false,
      priority: ''
    };
  }

  ngOnInit(): void {
    // construct the addition form
    this.todoForm = this.fBuilder.group({
      title: ['', [Validators.required]]
    });

    this.fetchTodos();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe() 
    );

    if (this.ref) {
      this.ref.close();
    }
  }

  async fetchTodos(): Promise<void> {
    const data = this.todoService.getTodos();
    
    try {
      this.todos = await lastValueFrom(data);
    } catch (error) {
      this.errMessage = String(error);
      this.show(State.ERROR);
    }
  }

  async updateStatus(todo: Todo): Promise<void> {
    const data = this.todoService.updateStatus(todo);
      
    try {
      await lastValueFrom(data);
      this.show(State.TOGGLED);
    } catch (error) {
      this.errMessage = String(error);
      this.show(State.ERROR);
    }
  }

  addTodo(): void {
    // construct new todo
    const todo = {...this._initializeTodo(), ...this.todoForm.value};

    // post the new todo
    this.subscriptions.push(this.todoService.createTodo(todo).subscribe({
      next: () => {
        this.todoForm.reset();
        this.fetchTodos();
        this.show(State.ADD);
      },
      error: (error) => {
        this.errMessage = error;
        this.show(State.ERROR);
      }
    }));
  }

  show(state: State): void {
    const stateMessages = {
      'updated': { severity: 'info', summary: 'Update', detail: 'The todo has been successfully updated.' },
      'deleted': { severity: 'warn', summary: 'Update', detail: 'The todo has been successfully deleted.' },
      'toggled': { severity: 'info', summary: 'Update', detail: 'The todo has been successfully toggled.' },
      'add': { severity: 'success', summary: 'Success', detail: 'The todo has been successfully added.' },
      'error': { severity: 'error', summary: 'Error', detail: `${this.errMessage}` },
    };
  
    const message = stateMessages[state];
    
    this.messageService.add(message);
  }

  editTodo(todo: Todo): void {
    this.ref = this.dialogService.open(ToDoEditComponent, {
      header: 'Edit the Todo',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        todo: todo
      }
    });

    this.subscriptions.push(this.ref.onClose.subscribe((response: State | [string, State]) => {
      if (response) {
        this.fetchTodos();

        if (response instanceof Array) {
          this.errMessage = response[0];
          response = response[1];
        }

        this.show(response);
      }
    }));

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
}
