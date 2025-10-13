const getRouter = require("./getRouter");
const postRouter = require("./postRouter");
const putRouter = require("./putRouter");
const deleteRouter = require("./deleteRouter");

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      getRouter(req, res);
      break;

    case "POST":
      postRouter(req, res);
      break;

    case "PUT":
      putRouter(req, res);
      break;

    case "DELETE":
      deleteRouter(req, res);
      break;

    default:
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Bad Request");
      break;
  }
};

module.exports = handler;
