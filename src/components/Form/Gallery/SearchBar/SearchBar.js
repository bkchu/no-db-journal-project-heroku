import React, { Component } from "react";

import Button from "../../../Button/Button";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.search(this.state.query);
  };

  render() {
    return (
      <div className="SearchBar">
        <form className="SearchBar__form" onSubmit={this.onSubmitHandler}>
          <input
            className="SearchBar__input"
            placeholder="Search for some photos, then hit enter."
            value={this.state.query}
            onChange={e => this.setState({ query: e.target.value })}
            type="text"
          />
          <button />
        </form>
        <Button classes="SearchBar__random" onClick={this.props.random}>
          Random
        </Button>
      </div>
    );
  }
}

export default SearchBar;
