const moment = require("moment");
const axios = require("axios");
// const posts = [
//   {
//     id: 6,
//     title: "A Complicated Hello World",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-03-01T17:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b6ce2d94a6218709710dd8f604c62425&auto=format&fit=crop&w=500&q=60",
//     imageUser: "bkchuu"
//   },
//   {
//     id: 5,
//     title: "Connections: A Gateway to Your Future",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-03-01T12:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1420177743490-15ee9ba8c78f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2480ea8944122e749541d6b25fb6bebf&auto=format&fit=crop&w=500&q=60",
//     imageUser: "bkchuu"
//   },
//   {
//     id: 4,
//     title: "React and AJAX",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-03-01T09:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=300889032f35d149002c7f9805f2904b&auto=format&fit=crop&w=500&q=60",
//     imageUser: "bkchuu"
//   },
//   {
//     id: 3,
//     title: "How to Use CSS Variables",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-02-28T17:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1507667522877-ad03f0c7b0e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9740ec30e869b5e79682658b348e82c&auto=format&fit=crop&w=500&q=60",
//     imageUser: "bkchuu"
//   },
//   {
//     id: 2,
//     title: "Just Another Day",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-02-26T17:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e75df7c9c10ae6d3d0a73a03f1dccce7&auto=format&fit=crop&w=1050&q=80",
//     imageUser: "bkchuu"
//   },
//   {
//     id: 1,
//     title: "A Meaningful Title",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac varius est, aliquam venenatis nunc. Aliquam quis pellentesque nulla, id interdum tellus. In ac augue eget urna eleifend scelerisque. Nunc varius eu ipsum id ullamcorper. Sed eget felis neque. Donec augue libero, aliquet tincidunt purus quis, imperdiet tincidunt nunc. Proin dignissim aliquam iaculis. Ut id sem leo. Curabitur suscipit purus erat, nec pellentesque eros laoreet nec. Ut eleifend eu velit eu aliquet. Aliquam porttitor justo id ullamcorper porta.",
//     date: "2018-01-25T17:23:53.151",
//     imageUrl:
//       "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=78847a9d49e94466dd2ab32d7031cd68&auto=format&fit=crop&w=1000&q=60",
//     imageUser: "bkchuu"
//   }
// ];
let numPosts = 0;
let parentObj = {};
const addPost = (req, res) => {
  let { title, text, imageUrl, imageUser, imageUserTag } = req.body;
  // posts.unshift({
  //   id: id,
  //   title,
  //   text,
  //   imageUrl,
  //   date: moment(),
  //   imageUser
  // });

  // id++;
  // res.status(200).send(posts);
  let body = {
    id: numPosts + 1,
    title,
    text,
    imageUrl,
    date: moment(),
    imageUser,
    imageUserTag
  };
  axios
    .post("https://react-journal-3c242.firebaseio.com/posts.json", body)
    .then(response => {
      res.status(200).send();
    })
    .catch(error => {
      console.log(error);
    });
};

const getPosts = (req, res) => {
  let posts = [];
  axios
    .get("https://react-journal-3c242.firebaseio.com/posts.json")
    .then(response => {
      parentObj = { ...response.data };
      let { data } = response;
      let i = 0;

      for (let key in data) {
        posts.unshift(data[key]);

        if (data.hasOwnProperty(key)) {
          i++;
        }
      }
      numPosts = i;
      res.status(200).send(posts);
    })
    .catch(err => {
      console.log(error);
    });
};

const getPost = (req, res) => {
  let posts = [];
  axios
    .get("https://react-journal-3c242.firebaseio.com/posts.json")
    .then(response => {
      let { data } = response;
      for (let key in data) {
        posts.unshift(data[key]);
      }
      if (
        isNaN(parseInt(req.params.id)) ||
        req.params.id <= 0 ||
        req.params.id > numPosts ||
        numPosts === 0
      ) {
        res.status(404).json({ error: "Post does not exist" });
      } else {
        res.status(200).send(posts[posts.length - req.params.id]);
      }
    })
    .catch(err => {
      console.log(error);
    });
};

const updatePost = (req, res) => {
  let theKey = null;
  for (let key in parentObj) {
    if (parentObj[key].id === parseInt(req.params.id)) {
      theKey = key;
    }
  }

  if (!theKey) {
    res.status(400).json({ message: "Post Not Found. " });
  } else {
    axios
      .put(`https://react-journal-3c242.firebaseio.com/posts/${theKey}.json`, {
        date: parentObj[theKey].date,
        id: parentObj[theKey].id,
        imageUrl: req.body.imageUrl || parentObj[theKey].imageUrl,
        imageUser: req.body.imageUser || parentObj[theKey].imageUser,
        imageUserTag: req.body.imageUserTag || parentObj[theKey].imageUserTag,
        text: req.body.text || parentObj[theKey].text,
        title: req.body.title || parentObj[theKey].title
      })
      .then(response => {
        res.status(200).send();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // let index = posts.findIndex(post => post.id === parseInt(req.params.id));
  // if (index === -1) {
  //   res.status(400).json({ message: "Post Not Found." });
  // } else {
  //   posts[index].title = req.body.title || posts[index].title;
  //   posts[index].text = req.body.text || posts[index].text;
  //   posts[index].imageUrl = req.body.imageUrl || posts[index].imageUrl;
  //   posts[index].imageUser = req.body.imageUser || posts[index].imageUser;
  //   res.status(200).send(posts);
  // }
};

const deletePost = (req, res) => {
  let theKey = null;
  for (let key in parentObj) {
    if (parentObj[key].id === parseInt(req.params.id)) {
      theKey = key;
    }
  }

  if (!theKey) {
    res.status(400).json({ message: "Post Not Found. " });
  } else {
    //deletePost
    delete parentObj[theKey];
    let count = 1;
    for (let key in parentObj) {
      parentObj[key].id = count;
      // console.log("parentObj[key].id: ", parentObj[key].id);
      count++;
    }
    id = count;
    axios
      .put(`https://react-journal-3c242.firebaseio.com/posts.json`, parentObj)
      .then(response => {
        res.status(200).send();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // let index = posts.findIndex(post => post.id === parseInt(req.params.id));
  // if (index === -1) {
  //   res.status(400).json({ message: "Post Not Found." });
  // } else {
  //   posts.splice(index, 1);
  //   posts.forEach((post, index) => {
  //     post.id = posts.length - index;
  //   });
  //   id = posts.length + 1;
  //   res.status(200).send(posts);
  // }
};

module.exports = {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};
