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
    // extract the todo
    this.todo = this.config.data.todo;

    console.log(`This is ${JSON.stringify(this.todo)}`)
  }

  updateToDo() {
    
  }

}
