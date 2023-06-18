import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Todo } from 'src/app/api/todo';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToDoEditComponent } from '../to-do-edit/to-do-edit.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit, OnDestroy {

    todos!: Todo[];
    ref: DynamicDialogRef | undefined;
    subscriptions: Subscription[] = [];
    errMsg!: string;
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

    fetchTodos(): void {
      // load up all the todos
      this.subscriptions.push(this.todoService.getTodos().subscribe({
        next: todos => this.todos = todos,
        error: err => this.errMsg = err
      }));    
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

    getPriorityClass(priority: string): string {
        switch (priority) {
            case 'High':
              return 'high-priority';
            case 'Medium':
              return 'medium-priority';
            case 'Low':
              return 'low-priority';
            default:
              return '';
        }
    }
    
    updateStatus(todo: Todo): void {
      this.subscriptions.push(this.todoService.updateStatus(todo).subscribe({
        next: () => this.show(todo.complete),
        error: (error) => this.errMsg = error
      }));
      
      // trigger table re-sort
      this.table.sort({
        field: 'complete',
        order: 1
      });

      // remove toggling of sort column
      this.table.reset();
    }

    addTodo() {
      // construct new todo
      const todo = {...this._initializeTodo(), ...this.todoForm.value};
      
      this.subscriptions.push(this.todoService.createTodo(todo).subscribe({
        next: () => {
          this.show(true);
          this.todoForm.reset();
          this.todos.push(todo);
        },
        error: (error) => this.errMsg = error
      }));
    }

    show(state?: boolean) {
      if (state) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo completed!' });
      } else {
        this.messageService.add({ severity: 'info', summary: 'Update', detail: 'The todo has been successfully added.' });
      }
    }

    editTodo(todo: Todo) {
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

      this.ref.onClose.subscribe();

      this.ref.onMaximize.subscribe((value) => {
          this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
      });
  }
}
