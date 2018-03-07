import React, { Component } from "react";
import axios from "axios";
import Gallery from "./Gallery/Gallery";
import Button from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      imageUrl: "",
      imageUser: "",
      imageUserTag: "",
      imageDownloadLocation: ""
    };
  }

  componentDidMount() {
    if (this.props.match.url === "/journal/edit") {
      let searchParam = new URLSearchParams(this.props.location.search);
      let idToGet = searchParam.get("id");
      axios.get("/api/journal/" + idToGet).then(response => {
        let { title, text, imageUrl, imageUser, imageUserTag } = response.data;
        this.setState({ title, text, imageUrl, imageUser, imageUserTag });
      });
    }
  }

  onSubmitHandler = () => {
    let {
      title,
      text,
      imageUrl,
      imageUser,
      imageUserTag,

      imageDownloadLocation
    } = this.state;

    axios.get(
      imageDownloadLocation + "?client_id=" + process.env.REACT_APP_CLIENT_ID
    );
    if (!(title === "" || text === "" || imageUrl === "")) {
      if (this.props.match.url === "/journal/new") {
        axios
          .post("/api/journal", {
            title,
            text,
            imageUrl,
            imageUser,
            imageUserTag
          })
          .then(response => {
            this.props.history.push("/");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let searchParam = new URLSearchParams(this.props.location.search);
        let idToGet = searchParam.get("id");
        axios
          .put("/api/journal/" + idToGet, {
            title,
            text,
            imageUrl,
            imageUser,
            imageUserTag
          })
          .then(response => {
            this.props.history.push("/journal/" + idToGet);
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      switch ("") {
        case title:
          toast.error("Title cannot be empty.");
          break;
        case text:
          toast.error("Message cannot be empty.");
          break;
        case imageUrl:
          toast.error("Search for an image.");
          break;
        default:
      }
    }
  };

  onTitleChangeHandler = e => {
    this.setState({ title: e.target.value });
  };

  onTextChangeHandler = e => {
    this.setState({ text: e.target.value });
  };

  onImageSelectedHandler = (
    imageUrl,
    imageUser,
    imageUserTag,
    imageDownloadLocation
  ) => {
    console.log("fired");
    this.setState({ imageUrl, imageUser, imageUserTag, imageDownloadLocation });
  };

  render() {
    let buttonText =
      this.props.match.url === "/journal/new" ? "+ Add Post" : "Publish Edits";

    return (
      <div className="Form">
        <input
          className="Form__input Form__input--title"
          placeholder="title"
          value={this.state.title}
          onChange={this.onTitleChangeHandler}
          type="text"
        />
        <textarea
          className="Form__input Form__input--text"
          placeholder="text"
          value={this.state.text}
          onChange={this.onTextChangeHandler}
          type="text"
        />
        <Gallery
          initial={this.state.imageUrl}
          onImageSelect={this.onImageSelectedHandler}
        />
        <Button classes={"Form__button"} onClick={this.onSubmitHandler}>
          {buttonText}
        </Button>
        <ToastContainer />
      </div>
    );
  }
}

export default Form;
