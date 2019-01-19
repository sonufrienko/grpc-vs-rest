const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const database = require("../../books.json");
const PROTO_FILE = `${__dirname}/../protos/books.proto`;

const PORT = process.env.PORT || 8080;

class BooksService {
  getEmpty(call, callback) {
    return callback(null, null);
  }

  getOne(call, callback) {
    return callback(null, database[0]);
  }

  getAll(call, callback) {
    return callback(null, { books: database });
  }
}

const getInterface = () => {
  const packageDefinition = protoLoader.loadSync(PROTO_FILE);
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  return protoDescriptor.books.BooksService.service;
};

const getServer = () => {
  const server = new grpc.Server();
  server.addService(getInterface(), new BooksService());
  return server;
};

const booksServer = getServer();
booksServer.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
booksServer.start();
console.log(`Server running on port ${PORT}`);
