const express = require("express");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const app = express();
const PORT = process.env.PORT || 3000;
const PROTO_FILE = `${__dirname}/../protos/books.proto`;
const SERVICE_B_PATH = process.env.SERVICE_B_PATH || "0.0.0.0:8080";

const packageDefinition = protoLoader.loadSync(PROTO_FILE);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const Client = protoDescriptor.books.BooksService;
const Books = new Client(SERVICE_B_PATH, grpc.credentials.createInsecure());

app.get("/empty", (req, res, next) => {
  Books.getEmpty(null, (err, data) => {
    res.end();
  });
});

app.get("/books", (req, res, next) => {
  Books.getAll(null, (err, data) => {
    const { books } = data;
    res.send(books);
  });
});

app.get("/books/1", (req, res, next) => {
  Books.getOne(null, (err, data) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.info(`Service A running at port ${PORT}`);
});
