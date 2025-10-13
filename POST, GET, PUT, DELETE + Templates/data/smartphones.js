const fs = require("fs");
const path = require("path");

//стартовая коллекция смартфонов
let smartphones = {
  "Телефон Apple iPhone 17 256GB": {
    price: "1294.45",
    someSpec:
      'смартфон\nApple iOS\nэкран 6.3" OLED (1206x2622) 120 Гц\nApple A19\nОЗУ 8 ГБ\n\t\nпамять 256 ГБ\nкамера 48 Мп\nаккумулятор 3692 мАч\nмоноблок\nвлагозащита IP68',
    img: "https://imgproxy.onliner.by/PK0bvrdDn6J4efOJBuA6VkJ4_F9NeZv6wqQf-ju3I5Q/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTViMmI3M2I0/YWUxZWQ0NWZkZDU2/ZjMxZGVlZmQ4NjIu/anBn",
  },
  "Телефон Samsung Galaxy A56 SM-A566E 8GB/256GB": {
    price: "395.07",
    someSpec:
      'смартфон\nAndroid\nэкран 6.7" AMOLED (1080x2340) 120 Гц\nExynos 1580\nОЗУ 8 ГБ\n\t\nпамять 256 ГБ\nкамера 50 Мп\nаккумулятор 5000 мАч\nмоноблок\nвлагозащита IP67',
    img: "https://imgproxy.onliner.by/k5d6gm7ssJ-0lKQYxC0Hv2Xd91h5Lr-zCjGB_XhSpDA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZWMzZTc3OTMx/OGNhM2RmMTYzZjc0/MjM5ODI0MjdhMmIu/anBn",
  },

  "Телефон Apple iPhone Air 256GB": {
    price: "0",
    someSpec:
      'смартфон\nApple iOS\nэкран 6.5" OLED (1260x2736) 120 Гц\nApple A19 Pro\nОЗУ 12 ГБ\n\t\nпамять 256 ГБ\nкамера 48 Мп\nаккумулятор 3149 мАч\nмоноблок\nвлагозащита IP68',
    img: "https://imgproxy.onliner.by/TrT3Ot0fBxg0iUGyA7jifV25YZNsQHfB_xfesyJ2F9Q/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzFlNDhkYzk2/NmFlOWZlNWM1OTVl/ZDI3N2MwNzg1Mzku/anBn",
  },
  "Телефон Samsung Galaxy S25 SM-S931B 12GB/256GB": {
    price: "793.47",
    someSpec:
      'смартфон\nAndroid\nэкран 6.2" AMOLED (1080x2340) 120 Гц\nQualcomm Snapdragon 8 Elite\nОЗУ 12 ГБ\n\t\nпамять 256 ГБ\nкамера 50 Мп\nаккумулятор 4000 мАч\nмоноблок\nвлагозащита IP68',
    img: "https://imgproxy.onliner.by/e08AVZI8swm3-H_ZT-O026QUCPBsjEERkx_brfN0v_k/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjlkMWY3MDY0/YjYyYTMxYjZmYWNl/MjQxMzgzODNhNDcu/anBn",
  },
  "Телефон Apple iPhone 17 Pro Max 256GB": {
    price: "2224.03",
    someSpec:
      'смартфон\nApple iOS\nэкран 6.9" OLED (1320x2868) 120 Гц\nApple A19 Pro\nОЗУ 12 ГБ\n\t\nпамять 256 ГБ\nкамера 48 Мп\nаккумулятор 4823 мАч\nмоноблок\nвлагозащита IP68',
    img: "https://imgproxy.onliner.by/HiZ9J7tEH2uDQsHo-OxlMcNdzmZqq7l3YqDvVNqYdk4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYWJiNzNjMzg5/N2QxMWQzNzgwYjBi/OWI2ZjY4OGMwOTMu/anBn",
  },

  "Телефон Huawei Pura 80 HED-LX9 12GB/256GB": {
    price: "730.39",
    someSpec:
      'смартфон\nэкран 6.6" OLED (1256x2760) 120 Гц\nHiSilicon Kirin 9010S\nОЗУ 12 ГБ\nпамять 256 ГБ\n\t\nкамера 50 Мп\nаккумулятор 5170 мАч\nмоноблок\nвлагозащита IP68/IP69',
    img: "https://imgproxy.onliner.by/MIKHxMqU_k-fxMlP8QXs57Puk0zkpVSBBpzQUnz9vWQ/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYzkwMjU2ODQ2/MmNkMzRhZDgzNWI2/ODE5ZDNlZjY1OGYu/anBn",
  },

  "Телефон Samsung Galaxy Z Fold7 SM-F966B/DS 12GB/256GB": {
    price: "0",
    someSpec:
      'смартфон\nAndroid\nэкран 8" AMOLED (1968x2184) 120 Гц\nQualcomm Snapdragon 8 Elite\nОЗУ 12 ГБ\n\t\nпамять 256 ГБ\nкамера 200 Мп\nаккумулятор 4400 мАч\nсо складным экраном (fold)\nвлагозащита IP48',
    img: "https://imgproxy.onliner.by/gOD1sfq_hnIHC7Y4XyyA_5MdRJ-7n7U58u_aFDcJ4c4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNDFkODE1OGY4/NTAzMzQ2NGIxZDBk/MjkyNjAzMTIyOTMu/cG5n",
  },
};

console.log(__dirname);

//пополняем коллекцию новыми данными из json-файла, который
//заполучили при пасринге страницы каталога onliner'а скриптом рядом
const dataFromJson = fs.readFileSync(
  path.join(__dirname, "./json/catalog (3).json")
);

//объединяем в той же коллекции данные из файлов
smartphones = {
  //которые были (... — распаковка)
  ...smartphones,

  //новые данные, которые получили после считывания в виде строки из файла и их десериализации
  ...JSON.parse(dataFromJson),

  //да-да, json-заготовки можно и проще считывать :)
  ...require("./json/catalog (4).json"),
  ...require("./json/catalog (6).json"),
  ...require("./json/catalog (7).json"),
};

// после импорта можно сохранить данные и в последующие разы импортировать
// сразу всё из файла all_smarts.json
// Чтобы подсмотреть в файле во всю нашу базу сведений
// console.log(smartphones);
fs.writeFileSync(
  path.join(__dirname, "./json/all_smarts.json"),
  JSON.stringify(smartphones, null, "\t")
);

//поиск смартфона по подстроке в имени
function getDeviceBySubname(subname) {
  const keys = Object.keys(smartphones);

  const results = [];
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      results.push({ name: key, ...smartphones[key] });
    }
  }

  return results.length > 0 ? results[0] : null;
}

//поиск ИМЕНИ целиком по подстроке в нём
// клиент написал pixel
// функция вернёт "Google Pixel 7 8GB/128GB"
// либо null, если у нас такого смартфона нет
function findDeviceNameBySubname(subname) {
  console.log(`subname: ${subname}`);
  // получаем массив ключей
  // напоминаю, что smartphones — это объект,
  // где ключи это названия смартфонов вида "Google Pixel 7 8GB/128GB"
  const keys = Object.keys(smartphones);
  console.log(keys);

  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return key;
    }
  }
  return null;
}

//удаление смартфона (находим по подстроке в имени)
function deleteDeviceBySubame(subname) {
  const devicename = findDeviceNameBySubname(subname);
  if (!devicename) return null;

  delete smartphones[devicename];
  return devicename;
}

//редактирование данных смартфона (находим по подстроке в имени)
function editDevice(data) {
  const { subname, price, someSpec } = data;
  const name = findDeviceNameBySubname(subname);

  // проверка на наличие ключа
  if (name && name in smartphones) {
    if (price !== undefined) {
      // запись вида smartphones[name] вернёт нам ссылку
      // на объект вида {
      //   price: "793.47",
      //   someSpec:
      //     'смартфон\nAndroid\nэкран 6.2" AMOLED (1080x2340) 120 Гц\nQualcomm Snapdragon 8 Elite\nОЗУ 12 ГБ\n\t\nпамять 256 ГБ\nкамера 50 Мп\nаккумулятор 4000 мАч\nмоноблок\nвлагозащита IP68',
      //   img: "https://imgproxy.onliner.by/e08AVZI8swm3-H_ZT-O026QUCPBsjEERkx_brfN0v_k/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjlkMWY3MDY0/YjYyYTMxYjZmYWNl/MjQxMzgzODNhNDcu/anBn",
      // }
      // через .price мы сможем поменять значение
      smartphones[name].price = price.replace("$", "");
    }
    if (someSpec !== undefined) {
      smartphones[name].someSpec = someSpec;
    }

    // console.log(smartphones);
    return { name: name, ...smartphones[name] };
  }

  return null;
}

//обавление нового смартфона
function addDevice(data) {
  const { name, price, someSpec, imgSrc } = data;

  // првоеряем, что обязательные поля инициализированы
  if (name && price && someSpec) {
    smartphones[name] = {
      price: price.replace("$", ""),
      someSpec,
      img: imgSrc,
    };

    // console.log(smartphones);
    // console.log(smartphones[name]);
    return { name: name, ...smartphones[name] };
  }

  return false;
}

const filterBy = (brand = "", maxprice = Infinity, sort = true) => {
  const keys = Object.keys(smartphones);

  let filteredSmartphones = [];
  for (const key of keys) {
    if (key.toLowerCase().includes(brand.toLowerCase())) {
      filteredSmartphones.push({ name: key, ...smartphones[key] });
    }
  }

  if (maxprice)
    filteredSmartphones = filteredSmartphones.filter(
      (smartphone) => parseInt(smartphone.price) <= (+maxprice || Infinity)
    );

  if (sort)
    filteredSmartphones = filteredSmartphones.sort((a, b) => a.price - b.price);

  return filteredSmartphones.length > 0 ? filteredSmartphones : null;
};

//все функции, кадлый из которых необходим для различных методов
//рядом указаны методы, в которых используются
module.exports = {
  getDeviceBySubname, //GET, POST
  filterBy, //GET
  addDevice, //POST
  editDevice, //PUT
  deleteDeviceBySubame, //DELETE
};
