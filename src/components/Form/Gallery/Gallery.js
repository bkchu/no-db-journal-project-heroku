import React, { Component } from "react";
import axios from "axios";

import SearchBar from "./SearchBar/SearchBar";
import Picture from "./Picture/Picture";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: this.props.initial || ""
    };
  }

  onSearchHandler = val => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${val}&client_id=${
          process.env.REACT_APP_CLIENT_ID
        }`
      )
      .then(res => {
        this.setState({ images: res.data.results });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };

  onRandomSearchHandler = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }`
      )
      .then(res => {
        console.log("res.data.urls.full,: ", res.data.urls.full);
        console.log("res.data.user.name,: ", res.data.user.name);
        console.log(
          "res.data.links.download_location: ",
          res.data.links.download_location
        );
        this.props.onImageSelect(
          res.data.urls.full,
          res.data.user.name,
          res.data.links.download_location
        );
        this.setState({ selectedImage: res.data });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };

  onClickHandler = index => {
    let { images } = this.state;
    this.props.onImageSelect(
      images[index].urls.regular,
      images[index].user.name,
      images[index].links.download_location
    );
    this.setState({ selectedImage: images[index] });
  };

  render() {
    let { images, selectedImage } = this.state;
    let pictures = <p>Loading...</p>;
    if (images.length >= 0) {
      pictures = images.map((image, index) => {
        return (
          <Picture
            clicked={() => this.onClickHandler(index)}
            key={image.id}
            url={image.urls.thumb}
            classes="Gallery__picture"
          />
        );
      });
    }

    let selectedPhoto = <div />;
    if (selectedImage !== "") {
      selectedPhoto = (
        <Picture
          clicked={null}
          url={selectedImage.urls.regular}
          classes="Gallery__selected"
        />
      );
    }

    return (
      <div className="Gallery">
        <SearchBar
          search={this.onSearchHandler}
          random={this.onRandomSearchHandler}
        />
        <div className="Gallery__pictures">{pictures}</div>
        <div>{selectedPhoto}</div>
      </div>
    );
  }
}

export default Gallery;
