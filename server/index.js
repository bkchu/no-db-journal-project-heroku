const express = require("express");
const { json } = require("body-parser");
const path = require("path");

const journalController = require(`${__dirname}/controllers/journal_controller`);

const app = express();

app.use(json());
app.use(express.static("/build"));

const baseUrl = "/api/journal";
app.post(baseUrl, journalController.addPost);
app.get(baseUrl, journalController.getPosts);
app.get(`${baseUrl}/:id`, journalController.getPost);
app.put(`${baseUrl}/:id`, journalController.updatePost);
app.delete(`${baseUrl}/:id`, journalController.deletePost);
app.get("*", (req, res) => {
  console.log(path.join(__dirname, "../build/index.html"));
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
