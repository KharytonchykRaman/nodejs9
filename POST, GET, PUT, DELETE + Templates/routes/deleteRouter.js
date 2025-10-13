const url = require("url");
const smartController = require("../controllers/smartController");

//удаление под подстроке имени
function deleteRouter(request, response) {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);

  switch (parsedUrl.pathname) {
    case "/api/catalog/device/delete":
      smartController.deleteDevice(request, response, parsedUrl);
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = deleteRouter;
