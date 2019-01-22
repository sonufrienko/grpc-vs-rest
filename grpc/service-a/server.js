const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_FILE = `${__dirname}/../protos/books.proto`;
const SERVICE_B_PATH = process.env.SERVICE_B_PATH || "0.0.0.0:8080";

const packageDefinition = protoLoader.loadSync(PROTO_FILE);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const Client = protoDescriptor.books.BooksService;
const Books = new Client(SERVICE_B_PATH, grpc.credentials.createInsecure());
const REQUEST_COUNT = process.env.REQUEST_COUNT;

const getEmptyAsync = call =>
  new Promise((resolve, reject) => {
    Books.getEmpty(call, (err, res) => (err ? reject(err) : resolve(res)));
  });

const getOneAsync = call =>
  new Promise((resolve, reject) => {
    Books.getOne(call, (err, res) => (err ? reject(err) : resolve(res)));
  });

const getAllAsync = call =>
  new Promise((resolve, reject) => {
    Books.getAll(call, (err, res) => (err ? reject(err) : resolve(res)));
  });

const benchmark = async f => {
  const startTime = process.hrtime();
  for (let i = 1; i <= REQUEST_COUNT; i++) {
    await f(null);
  }
  const endTime = process.hrtime(startTime);
  console.log(
    `Done ${REQUEST_COUNT.toLocaleString()} ${f.name} in ${endTime[0]} s ${(
      endTime[1] / 1e6
    ).toFixed(4)} ms`
  );
};

(async () => {
  await benchmark(getEmptyAsync);
  await benchmark(getOneAsync);
  await benchmark(getAllAsync);
})();
