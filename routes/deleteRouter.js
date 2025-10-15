const url = require("url");
const carController = require("../controllers/carController");

const deleteRouter = (req, res) => {
  const pathname = url.parse(req.url, false).pathname;
  switch (pathname) {
    case "/adminpage/delete":
      carController.remove(req, res);
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
      break;
  }
};

module.exports = deleteRouter;
