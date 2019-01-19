const request = require("request");
const express = require("express");
const http = require("http");

http.globalAgent.keepAlive = true;

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_B_BASE_URL =
  process.env.SERVICE_B_BASE_URL || "http://localhost:3001";

app.get("/empty", (req, res, next) => {
  request(`${SERVICE_B_BASE_URL}/empty`, (error, response, body) => {
    res.end();
  });
});

app.get("/books", (req, res, next) => {
  request(`${SERVICE_B_BASE_URL}/books`, (error, response, body) => {
    res.send(body);
  });
});

app.get("/books/1", (req, res, next) => {
  request(`${SERVICE_B_BASE_URL}/books/1`, (error, response, body) => {
    res.send(body);
  });
});

app.listen(PORT, () => {
  console.info(`Service A running at port ${PORT}`);
});
