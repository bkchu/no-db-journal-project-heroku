import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "../Button/Button";
import FontAwesome from "react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

class FullPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      deleteConfirm: 0,
      doesntExist: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/journal/" + this.props.match.params.id)
      .then(response => {
        this.setState({ selected: response.data, deleteConfirm: 0 });
      })
      .catch(error => {
        this.setState({ doesntExist: true });
      });
  }

  onDeletePostHandler = () => {
    if (this.state.deleteConfirm === 1) {
      axios
        .delete("/api/journal/" + this.props.match.params.id)
        .then(response => {
          this.props.history.push("/");
          this.setState({ selected: null, deleteConfirm: 0 });
        });
    } else {
      toast.warn("Press again to delete.");
      this.setState({ deleteConfirm: this.state.deleteConfirm + 1 });
    }
  };

  // onEditPostHandler = () => {
  //   this.props.history.push("/journal/edit/" + this.props.match.params.id);
  // };

  render() {
    let display = <p>Loading...</p>;
    if (this.state.doesntExist) {
      display = <p>404</p>;
    }
    if (this.state.selected) {
      let { date, imageUrl, text, title, imageUser } = this.state.selected;
      display = (
        <div className="FullPost">
          <div className="FullPost__title">{title}</div>
          <div className="FullPost__date">
            {moment(date).format("MMM DD, YYYY")}
          </div>
          <div className="FullPost__buttons">
            <Link
              to={{
                pathname: "/journal/edit",
                search: "?id=" + this.props.match.params.id
              }}
              style={{
                flex: "1"
              }}
            >
              <Button
                // onClick={this.onEditPostHandler}
                classes={"FullPost__button FullPost__button--edit"}
              >
                <FontAwesome name="edit" />
              </Button>
            </Link>
            <Button
              onClick={this.onDeletePostHandler}
              classes={"FullPost__button FullPost__button--delete"}
            >
              <FontAwesome name="trash" />
            </Button>
          </div>
          <img className="FullPost__image" src={imageUrl} alt="" />
          <p className="FullPost__image-user">
            Photo by{" "}
            <a
              className="image__link"
              href={`https://unsplash.com/@${imageUser}?utm_source=react-journal&utm_medium=referral`}
            >
              {imageUser}
            </a>{" "}
            on{" "}
            <a
              className="image__link"
              href="https://unsplash.com/?utm_source=react-journal&utm_medium=referral"
            >
              Unsplash
            </a>
          </p>
          <div className="FullPost__text">{text}</div>
        </div>
      );
    }
    return (
      <div className="FullPost">
        {display}
        <ToastContainer />
      </div>
    );
  }
}

export default FullPost;
