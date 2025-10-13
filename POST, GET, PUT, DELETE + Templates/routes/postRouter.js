const smartController = require("../controllers/smartController");

function postRouter(request, response) {
  switch (request.url) {
    //более стандартное использование POST — для ДОБАВЛЕНИЯ нового в коллекцию
    case "/api/catalog/device/add":
      smartController.addDevice(request, response);
      break;

    //обработчик получения объекта с данными о смартфоне по подстроке в имени
    case "/api/catalog/device/get":
      smartController.getDeviceByPost(request, response);
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = postRouter;
