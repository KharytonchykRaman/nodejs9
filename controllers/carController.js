const fs = require("fs");
const path = require("path");
const url = require("url");
const cars = require("../data/cars");

const dumpFilePath = path.join(__dirname, "..", "data", "cars.json");

const getAllCars = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(cars.list));
};

const getFilteredCars = (req, res) => {
  const queryObj = url.parse(req.url, true).query;

  const filteredCars = cars.getFilteredCars(queryObj);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(filteredCars));
};

const getAllCarsDump = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Disposition": "attachment; filename=cars.json",
  });

  fs.createReadStream(dumpFilePath).pipe(res);
};

const getFilteredCarsDump = (req, res) => {
  const queryObj = url.parse(req.url, true).query;

  const filteredCars = cars.getFilteredCars(queryObj);
  const jsonData = JSON.stringify(filteredCars, null, "\t");

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Disposition": "attachment; filename=filtered_cars.json",
  });

  res.end(jsonData);
};

const add = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const clientData = JSON.parse(data);

    if (cars.list.some((car) => car.number === clientData.number)) {
      res.writeHead(409, { "Content-Type": "text/plain" });
      return res.end("Car with such number already exists!");
    }

    cars.list.push(clientData);
    fs.writeFileSync(dumpFilePath, JSON.stringify(cars.list, null, "\t"));

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("New car information added!");
  });
};

const edit = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const clientData = JSON.parse(data);

    if (!cars.list.some((car) => car.number === clientData.number)) {
      res.writeHead(409, { "Content-Type": "text/plain" });
      return res.end("Car with such number doesn't exist!");
    }

    const carIndex = cars.list.findIndex(
      (car) => car.number === clientData.number
    );
    cars.list[carIndex] = clientData;

    fs.writeFileSync(dumpFilePath, JSON.parse(cars.list, null, "\t"));

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Car information edited!");
  });
};

const remove = (req, res) => {
  const carNumber = url.parse(req.url, true).query.number;

  const carIndex = cars.list.findIndex((car) => car.number === carNumber);

  if (carIndex === -1) {
    res.writeHead(409, { "Content-Type": "text/plain" });
    return res.end("Car with such number doesn't exist!");
  }

  cars.list.splice(carIndex, 1);

  fs.writeFileSync(dumpFilePath, JSON.stringify(cars.list, null, "\t"));

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Car deleted!");
};

module.exports = {
  getAllCars,
  getFilteredCars,
  getAllCarsDump,
  getFilteredCarsDump,
  add,
  edit,
  remove,
};
