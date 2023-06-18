import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToDoData } from './to-do-data';
import { TodoService } from 'src/app/service/todo.service';

@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    TagModule,
    ButtonModule,
    CheckboxModule,
    StyleClassModule,
    InputTextModule,
    InMemoryWebApiModule.forRoot(ToDoData),
    ToDoRoutingModule
  ],
  providers: [TodoService]
})
export class ToDoModule { }
