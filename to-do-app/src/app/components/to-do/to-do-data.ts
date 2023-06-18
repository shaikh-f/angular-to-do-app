import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from 'src/app/api/todo';

export class ToDoData implements InMemoryDbService {

  constructor() {
    console.log("in constructor");
  }

  createDb() {
    console.log("Hello World");
    
    const todos: Todo[] = [
        {
            id: 1,
            title: "Complete project 1",
            description: "Finish the task before the deadline",
            complete: false,
            priority: "High",
          },
          {
            id: 2,
            title: "Buy groceries 1",
            description: "Get fruits, vegetables, and other essentials",
            complete: false,
            priority: "Medium",
          },
          {
            id: 3,
            title: "Go for a run 1",
            description: "Run for 30 minutes in the park",
            complete: false,
            priority: "Low",
          },
          {
            id: 4,
            title: "Study for exam",
            description: "Prepare for the upcoming test",
            complete: false,
            priority: "High",
          },
          {
            id: 5,
            title: "Write report",
            description: "Summarize the findings and submit the report",
            complete: false,
            priority: "Medium",
          },
          {
            id: 6,
            title: "Attend meeting",
            description: "Discuss project updates with the team",
            complete: false,
            priority: "Low",
          },
          {
            id: 7,
            title: "Clean the house",
            description: "Tidy up the rooms and do some dusting",
            complete: false,
            priority: "Low",
          },
          {
            id: 8,
            title: "Pay bills",
            description: "Settle electricity, water, and internet bills",
            complete: false,
            priority: "Medium",
          },
          {
            id: 9,
            title: "Call a friend",
            description: "Catch up with a friend over the phone",
            complete: false,
            priority: "Low",
          },
          {
            id: 10,
            title: "Prepare dinner",
            description: "Cook a delicious meal for the family",
            complete: false,
            priority: "Medium",
          },
          {
            id: 11,
            title: "Read a book",
            description: "Spend some time reading a novel",
            complete: false,
            priority: "Low",
          },
          {
            id: 12,
            title: "Go to the gym",
            description: "Workout for an hour at the fitness center",
            complete: false,
            priority: "Medium",
          },
          {
            id: 13,
            title: "Write code",
            description: "Develop a new feature for the application",
            complete: false,
            priority: "High",
          },
          {
            id: 14,
            title: "Watch a movie",
            description: "Enjoy a film at the cinema or at home",
            complete: false,
            priority: "Low",
          },
          {
            id: 15,
            title: "Organize files",
            description: "Sort and arrange documents and folders",
            complete: false,
            priority: "Medium",
          },
          {
            id: 16,
            title: "Take a nap",
            description: "Rest and recharge for 30 minutes",
            complete: false,
            priority: "Low",
          },
          {
            id: 17,
            title: "Visit a museum",
            description: "Explore art and culture at a local museum",
            complete: false,
            priority: "Medium",
          },
    ];
    return { todos };
  }
}
