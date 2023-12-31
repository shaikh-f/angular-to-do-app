import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ToDoRoutingModule } from './to-do-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToDoData } from './to-do-data';
import { TodoService } from 'src/app/service/todo.service';
import { MessageService } from 'primeng/api';
import { ToDoEditComponent } from './to-do-edit/to-do-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ButtonModule,
    CheckboxModule,
    InputTextareaModule,
    
    StyleClassModule,
    InputTextModule,
    InMemoryWebApiModule.forRoot(ToDoData),
    ToDoRoutingModule
  ],
  providers: [TodoService, MessageService, DialogService]
})
export class ToDoModule { }
