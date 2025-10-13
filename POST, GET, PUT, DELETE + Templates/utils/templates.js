const fs = require("fs");
const path = require("path");

const SmartItemTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/smartItem.html"),
  "utf-8"
);
const SmartListPageTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/smartListPage.html"),
  "utf-8"
);

const renderTemplate = (smartphones) => {
  const renderedData = (smartphones ? smartphones : [])
    .map((item) =>
      SmartItemTemplate.replace("{{name}}", item.name)
        .replace("{{price}}", `${item.price}$`)
        .replace(
          "{{image-src}}",
          item.img.includes("http")
            ? item.img
            : `https://content2.onliner.by/catalog/device/${item.img}`
        )
    )
    .join("");

  const html = SmartListPageTemplate.replace("{{content}}", renderedData)
    .replace(
      "{{title}}",
      renderedData ? "Раздел Смартфоны" : `Смартфонов не найдено :(`
    )
    .replace(
      "{{titleH1}}",
      renderedData
        ? "Вот что мы для Вас подобрали (:"
        : `<span style="color:red">Смартфонов с подходящими характеристиками не найдено :(</span>`
    );

  return html;
};

module.exports = renderTemplate;
