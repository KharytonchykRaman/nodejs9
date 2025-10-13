const smartController = require("../controllers/smartController");
//обработчик для изменения данных. Смартфон для изменения находится по подстроке в имени
function putRouter(request, response) {
  switch (request.url) {
    case "/api/catalog/device/edit":
      smartController.editDevice(request, response);
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = putRouter;
