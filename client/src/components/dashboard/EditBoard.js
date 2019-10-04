import React, { Component } from "react";
import axios from "axios";
import { EventEmitter } from "events";

class EditBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.theBoard.title,
      description: this.props.theBoard.description
    };
  }

  handleFormSubmit = event => {
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/boards/${this.props.theBoard._id}`, {
        title,
        description
      })
      .then(() => {
        this.props.getTheBoard();
        this.props.history.push("/boards");
      })
      .catch(error => console.log(error));
  };

  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleChangeDesc = event => {
    this.setState({
      description: event.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit Board</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChangeTitle(e)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChangeDesc(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditBoard;
