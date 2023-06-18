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
    subscriptions: Subscription[] = [];
    errMsg!: string;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        // load up all the todos
        this.subscriptions.push(this.todoService.getTodos().subscribe({
            next: todos => this.todos = todos,
            error: err => this.errMsg = err
        }));    
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(
          (subscription) => subscription.unsubscribe() 
        );
    }

    getPriorityClass(priority: string): string {
        switch (priority) {
            case 'High':
              return 'high-priority';
            case 'Medium':
              return 'medium-priority';
            case 'Low':
              return 'low-priority';
            default:
              return '';
        }
    }
    
    updateStatus(todo: Todo): void {
      this.subscriptions.push(this.todoService.updateStatus(todo).subscribe({
        next: () => console.log("Done"),
        error: (error) => this.errMsg = error
      }));  
    }
}
