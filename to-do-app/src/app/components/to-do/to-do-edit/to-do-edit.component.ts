import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Priority, Todo } from 'src/app/api/todo';

@Component({
  selector: 'app-to-do-edit',
  templateUrl: './to-do-edit.component.html'
})
export class ToDoEditComponent implements OnInit{

  todo!: Todo;
  editForm!: FormGroup;
  priorities!: Priority[];
  
  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fBuilder: FormBuilder) {}

  
  ngOnInit(): void {
    // extract the todo
    this.todo = this.config.data.todo;
    
    // construct priorities dropdown
    this.priorities = [
      { name: "High", code: 'H' },
      { name: "Medium", code: 'M' },
      { name: "Low", code: 'L' }
    ];

    // construct the form itself
    this.editForm = this.fBuilder.group({
      title: ['', [Validators.required]],
      priority: [null, [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  updateToDo() {
  }

}
