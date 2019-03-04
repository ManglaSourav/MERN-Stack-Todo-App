import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    };
  }
  onChangeTodoDescription = e => {
    this.setState({
      todo_description: e.target.value
    });
    // console.log(this.todo_description);
  };

  onChangeTodoResponsible = e => {
    this.setState({
      todo_responsible: e.target.value
    });
  };
  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.name
    });
    // console.log("hey im from priority method", e.target.name);
  }
  onSubmit = e => {
    e.preventDefault(); //prevent default submission of form
    console.log("Form Submited");
    console.log(`Todo Description:${this.state.todo_description}`);
    console.log(`Todo Responsible:${this.state.todo_responsible}`);
    console.log(`Todo Priority:${this.state.todo_priority}`);
    console.log(`Todo Completed:${this.state.todo_completed}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then(res => console.log(res.data));

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    });
  };

  render() {
    return (
      <div className='mt-4'>
        <h3>Create New Todo</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              onChange={this.onChangeTodoDescription}
              value={this.state.todo_description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Responsible</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Responsible'
              onChange={this.onChangeTodoResponsible}
              value={this.state.todo_responsible}
            />
          </Form.Group>

          <Form.Group as={Form.Row}>
            {/* <Form.Label>Priority</Form.Label> */}
            {/* <Form.Row> */}
            <Form.Check
              className='ml-2 mr-2'
              type='radio'
              label='Low'
              custom
              name='Low'
              id='priorityLow'
              checked={this.state.todo_priority === "Low"}
              onChange={this.onChangeTodoPriority}
            />
            <Form.Check
              className='mr-2'
              type='radio'
              label='Medium '
              custom
              name='Medium'
              id='priorityMedium'
              checked={this.state.todo_priority === "Medium"}
              onChange={this.onChangeTodoPriority}
            />
            <Form.Check
              className='mr-2'
              type='radio'
              custom
              label='High '
              name='High'
              id='priorityHigh'
              checked={this.state.todo_priority === "High"}
              onChange={this.onChangeTodoPriority}
            />
            {/* </Form.Row> */}
          </Form.Group>
          <Form.Group>
            <Button variant='primary' type='submit'>
              Create Todo
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
