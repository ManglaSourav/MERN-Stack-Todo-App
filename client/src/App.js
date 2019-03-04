import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodosList from "./componenets/TodosList";
import CreateTodo from "./componenets/CreateTodo";
import EditTodo from "./componenets/EditTodo";
import CustomNavbar from "./componenets/CustomNavbar";
class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <CustomNavbar />
          <Route path='/' exact component={TodosList} />
          <Route path='/edit/:id' component={EditTodo} />
          <Route path='/create' component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
