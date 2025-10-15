const fs = require("fs");
const path = require("path");

const list = [
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "cars.json")))
];

const getFilteredCars = (queryObj) => {
  let filteredCars = list;

  const {
    brand,
    colorWord,
    releaseYear,
    engineType,
    violationsNumber,
    unpaidFines,
  } = queryObj;

  if (brand) {
    filteredCars = filteredCars.filter((car) => car.brand === brand);
  }
  if (colorWord) {
    filteredCars = filteredCars.filter((car) => car.colorWord === colorWord);
  }
  if (releaseYear) {
    filteredCars = filteredCars.filter((car) => car.releaseYear >= releaseYear);
  }
  if (engineType) {
    filteredCars = filteredCars.filter((car) => car.engineType === engineType);
  }
  if (violationsNumber) {
    filteredCars = filteredCars.filter(
      (car) => car.violationsNumber >= violationsNumber
    );
  }
  if (unpaidFines) {
    filteredCars = filteredCars.filter((car) => car.unpaidFines >= unpaidFines);
  }

  return filteredCars;
};

module.exports = { list, getFilteredCars };
