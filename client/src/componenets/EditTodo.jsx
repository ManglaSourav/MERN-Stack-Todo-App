import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeTodoDescription = e => {
    this.setState({
      todo_description: e.target.value
    });
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
  }
  onChangeTodoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed
    });
  }
  onSubmit = e => {
    e.preventDefault(); //prevent default submission of form

    const updatedTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    axios
      .post(
        "http://localhost:4000/todos/update/" + this.props.match.params.id,
        updatedTodo
      )
      .then(res => console.log(res.data));
    this.props.history.push("/");
  };

  deleteTodo = e => {
    // console.log(this.props.match.params.id);
    axios
      .delete("http://localhost:4000/todos/" + this.props.match.params.id)
      .then(res => console.log(res.data));
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Responsible</Form.Label>
            <Form.Control
              type='text'
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
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
            <Form.Check
              className='mr-2'
              type='checkbox'
              custom
              label='Completed'
              name=''
              id='completedCheckbox'
              value={this.state.todo_completed}
              // checked={this.state.todo_completed}
              onChange={this.onChangeTodoCompleted}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update Todo
          </Button>
          <Button variant='danger' onClick={this.deleteTodo}>
            Delete Todo
          </Button>
        </Form>
      </div>
    );
  }
}
