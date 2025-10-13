const list = [
  {
    brand: "ford",
    number: "1234-AA5",
    color: "#96bbe1ff",
    colorWord: "light-blue",
    releaseYear: "2000",
    engineType: "electro",
    violationsNumber: "2",
    unpaidFines: "100$",
    imgSrc: "/img/speed.png",
  },
  {
    brand: "toyota",
    number: "5678-BB9",
    color: "#c23b22ff",
    colorWord: "red",
    releaseYear: "2015",
    engineType: "hybrid",
    violationsNumber: "1",
    unpaidFines: "75$",
    imgSrc: "/img/sedan.png",
  },
  {
    brand: "bmw",
    number: "9012-CC3",
    color: "#39393939",
    colorWord: "black",
    releaseYear: "2022",
    engineType: "gasoline",
    violationsNumber: "0",
    unpaidFines: "0$",
    imgSrc: "/img/sport.png",
  },
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
