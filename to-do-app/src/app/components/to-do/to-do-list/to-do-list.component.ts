import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/api/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit, OnDestroy {

    todos!: Todo[];

    subscription!: Subscription;

    constructor() {}

    ngOnInit() {
        
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
