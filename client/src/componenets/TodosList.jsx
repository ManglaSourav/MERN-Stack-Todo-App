import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos")
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/todos")
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  todosList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <Table className='mt-3' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todosList()}</tbody>
        </Table>
        ;
      </div>
    );
  }
}
