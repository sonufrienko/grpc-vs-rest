const express = require("express");
const BOOKS_DATA = require("../../books.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/empty", async (req, res, next) => {
  res.end();
});

app.get("/books", async (req, res, next) => {
  res.send(BOOKS_DATA);
});

app.get("/books/1", async (req, res, next) => {
  res.send(BOOKS_DATA[0]);
});

app.listen(PORT, () => {
  console.info(`Service B running at port ${PORT}`);
});
