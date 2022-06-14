const http = require("http");
const app = require("./app");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

try {
  console.log("Starting server...");

  server.listen(port, () => {
    console.log("env : ", process.env.NODE_ENV || "development");
    console.log(`App started on port ${port}`);
  });
} catch (e) {
  console.error("Startup error!", e);
}
