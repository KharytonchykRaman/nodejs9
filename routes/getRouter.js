const fs = require("fs");
const path = require("path");
const url = require("url");
const carController = require("../controllers/carController");
const defaultController = require("../controllers/defaultController");

const getRouter = (req, res) => {
  const pathname = url.parse(req.url, false).pathname;
  switch (pathname) {
    case "/":
      fs.createReadStream(
        path.join(__dirname, "..", "public", "index.html")
      ).pipe(res);
      break;

    case "/car-violation/all":
      carController.getAllCars(req, res);
      break;

    case "/car-violation/filter":
      carController.getFilteredCars(req, res);
      break;

    case "/adminpage/dump":
      carController.getAllCarsDump(req, res);
      break;

    case "/adminpage/dump/filter":
      carController.getFilteredCarsDump(req, res);
      break;

    default:
      defaultController(req, res);
      break;
  }
};

module.exports = getRouter;
