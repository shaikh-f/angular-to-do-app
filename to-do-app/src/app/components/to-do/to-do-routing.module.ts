import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ToDoListComponent }
    ])],
    exports: [RouterModule]
})
export class ToDoRoutingModule { }
