import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/api/todo';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit, OnDestroy {

    todos!: Todo[];
    pageTitle: string = '';
    subscription!: Subscription;
    errMsg!: string;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        // load up all the todos
        this.subscription = this.todoService.getTodos().subscribe({
            next: todos => this.todos = todos,
            error: err => this.errMsg = err
        });    
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
