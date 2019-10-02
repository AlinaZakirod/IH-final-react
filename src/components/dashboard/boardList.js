import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddBoard from "./addBoard";

class BoardList extends Component {
  constructor() {
    super();
    this.state = { listOfBoards: [] };
  }

  getAllBoards = () => {
    axios.get(`http://localhost:5000/api/boards`).then(responseFromApi => {
      this.setState({
        listOfBoards: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllBoards();
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfBoards.map(board => {
            return (
              <div key={board._id}>
                <Link to={`/boards/${board._id}`}>
                  <h3>{board.title}</h3>
                  {/* <p style={{maxWidth: '400px'}}>{project.description}</p> */}
                </Link>
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddBoard getData={() => this.getAllBoards()} />
        </div>
      </div>
    );
  }
}

export default BoardList;
