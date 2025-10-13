const carController = require("../controllers/carController");

const putRouter = (req, res) => {
  switch (req.url) {
    case "/adminpage/edit":
      carController.edit(req, res);
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
      break;
  }
};

module.exports = putRouter;
