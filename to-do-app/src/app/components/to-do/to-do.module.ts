import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ProductService } from '../../service/product.service';

@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    StyleClassModule,
    InputTextModule,
    ToDoRoutingModule
  ],
  providers: [ProductService]
})
export class ToDoModule { }