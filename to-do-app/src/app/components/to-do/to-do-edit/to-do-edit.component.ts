import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Todo } from 'src/app/api/todo';

@Component({
  selector: 'app-to-do-edit',
  templateUrl: './to-do-edit.component.html'
})
export class ToDoEditComponent implements OnInit{

  todo!: Todo;
  
  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig) {}

  
  ngOnInit(): void {
    const todoId = this.config.data.todoId;
  }

}
