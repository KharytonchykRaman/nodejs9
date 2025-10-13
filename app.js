const http = require("http");
const handler = require("./routes/index");
const PORT = 5000;

http
  .createServer(handler)
  .listen(PORT, () => console.log(`http://localhost:${PORT}/`));
