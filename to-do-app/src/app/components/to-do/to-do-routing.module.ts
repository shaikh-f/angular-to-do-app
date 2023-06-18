import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoEditComponent } from './to-do-edit/to-do-edit.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ToDoListComponent },
        { path: 'edit/:id', component: ToDoEditComponent }
    ])],
    exports: [RouterModule]
})
export class ToDoRoutingModule { }
