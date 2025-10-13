const url = require("url");
const smartphones = require("../data/smartphones");
const renderSmartPage = require("../utils/templates");

//POST-метод запроса для добавления устрйоства
//данные получаем из body — потому нам необходимо обслужить chunk'и (порции данных)
const addDevice = (request, response) => {
  let data = "";

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    //данные приходят в виде JSON-строки
    //чтобы получить их изначальную форму, десериализуем строку
    //в этот момент она превратится в объект, с которым можно работать стандартными путями
    const dataFromClient = JSON.parse(data);

    //функция добавления нового девайса — вся обработка на её стороне
    const result = smartphones.addDevice(dataFromClient);

    //при негативном результате работы сообщаем пользователю
    if (!result) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Error devicename");
      return;
    }

    // если проблем нет, сообщаем об этом клиенту
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  });
};

const getDevice = (request, response, name) => {
  //ищем девайс по подстроке в имени
  //если найден — вернётся объект с именем полным и хар-ками
  const deviceInfo = smartphones.getDeviceBySubname(name);

  //если не найден — null
  if (!deviceInfo) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Error devicename");
    return;
  }

  //отправляем JSON строку с объектом внутри с данными смартфона
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(deviceInfo));
};

//демонстрация того, что через POST можно и получать сведения
const getDeviceByPost = (request, response) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    const dataFromClient = JSON.parse(data);
    getDevice(request, response, dataFromClient.name);
  });
};

//шаблонизация страницы по маршруту
// /api/catalog/device/all?maxprice=610&brand=sams&sort=false
const getAll = (request, response, parsedUrl) => {
  const { brand, maxprice, sort } = parsedUrl.query;

  const html = renderSmartPage(
    smartphones.filterBy(brand, maxprice, sort == "true")
  );

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(html);
};

//PUT-метод
//полностью аналогичен POST
//данные передаём через body
//значит, необходимо собирать chunk'и
const editDevice = (request, response) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    const dataFromClient = JSON.parse(data);
    //отправляем объект с данными для редактирования — логика находится на той стороне
    const deviceInfo = smartphones.editDevice(dataFromClient);

    if (!deviceInfo) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Smartphone not found");
      return;
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(deviceInfo));
  });
};

//аналогичен GET-методу
//значит, получаем данные от клиент из строки маршрута
const deleteDevice = (request, response, parsedUrl) => {
  //создаём name, занося в него соответствующее по ключу значение из объекта
  const { name } = parsedUrl.query;

  //дёргаем функцию из модуля, связанного с коллекцией данных
  const devicename = smartphones.deleteDeviceBySubame(name);

  //если вернулся null — отправляем соответствующий ответ
  if (!devicename) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("isn't find");
    return;
  }

  // если всё ОК -- отправляем название смартфона ответом
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(devicename);
};

module.exports = {
  addDevice, //POST
  getDevice, //GET
  getDeviceByPost, //POST
  getAll, //GET
  editDevice, //PUT
  deleteDevice, //DELETE
};
