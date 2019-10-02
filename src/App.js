import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import BoardList from "./components/dashboard/boardList";
import BoardDetails from "./components/dashboard/BoardDetails";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <BoardList />
        <Switch>
          <Route exact path="/boards" componebt={BoardList} />
          <Route exact path="/boards/:id" component={BoardDetails} />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
