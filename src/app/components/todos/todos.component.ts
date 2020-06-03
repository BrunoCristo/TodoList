import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import {Todo} from '../../models/Todo'
import {Token} from '../../models/Token'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  token:Token[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getToken().subscribe(token => {
      this.token = token
    })

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });

  }

  deleteTodo(todo:Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this.todos.push(todo);
    this.todoService.addTodo(todo).subscribe(todo => {})
  }

  editTodo(todo:Todo) {
    console.log(todo)
    this.todoService.editTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }
}
