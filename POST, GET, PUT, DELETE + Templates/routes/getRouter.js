const url = require("url");
const smartController = require("../controllers/smartController");
const staticFilesController = require("../controllers/staticFilesController");

function getRouter(request, response) {
  const paredUrl = url.parse(request.url, true);
  switch (paredUrl.pathname) {
    case "/":
      response.writeHead(302, {
        Location: "/index.html",
      });
      response.end();
      break;
    case "/api/catalog/device/get":
      const { name } = paredUrl.query;
      smartController.getDevice(request, response, name);
      break;

    case "/catalog/device/all":
      smartController.getAll(request, response, paredUrl);
      break;
    default:
      staticFilesController(request, response);
  }
}

module.exports = getRouter;
