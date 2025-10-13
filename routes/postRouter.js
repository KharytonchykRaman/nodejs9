const carController = require("../controllers/carController");

const postRouter = (req, res) => {
  switch (req.url) {
    case "/adminpage/add":
      carController.add(req, res);
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
      break;
  }
};

module.exports = postRouter;
