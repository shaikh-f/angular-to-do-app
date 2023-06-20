import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/api/todo';
import { TodoService } from '../../../service/todo.service';

@Component({
  selector: 'app-to-do-edit',
  templateUrl: './to-do-edit.component.html'
})
export class ToDoEditComponent implements OnInit, OnDestroy{

  todo!: Todo;
  editForm!: FormGroup;
  subscriptions: Subscription[] = [];
  priorities!: string[];
  
  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fBuilder: FormBuilder,
              private todoService: TodoService) {}

  
  ngOnInit(): void {
    // extract the todo
    this.todo = this.config.data.todo;
    
    // dropdown option values
    this.priorities = [
      "High",
      "Medium",
      "Low"
    ];

    // construct the form itself
    this.editForm = this.fBuilder.group({
      title: ['', [Validators.required]],
      priority: [null, [Validators.required]],
      description: ['', [Validators.required]]
    });

    // set the form values
    this.editForm.patchValue({
      title: this.todo.title,
      priority: this.priorities.find(priority => priority === this.todo.priority),
      description: this.todo.description
    });
  }

  ngOnDestroy(): void {
    // unsubscribe all subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateTodo() {
    // copy the changes
    const newTodo: Todo = {...this.todo, ...this.editForm.value};

    // make the PUT request
    this.subscriptions.push(this.todoService.updateTodo(newTodo).subscribe({
      next: () => this.ref.close('updated'),
      error: (error) => this.ref.close(error.error.message)
    }));
  }

  deleteTodo() {
    this.subscriptions.push(this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => this.ref.close('deleted'),
      error: (error) => this.ref.close(error.error.message)
    }));
  }
}
