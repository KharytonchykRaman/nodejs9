function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.click();
}

const currency = parseFloat(
  document.querySelector("._u").innerText.replace("$ ", "").replace(",", ".")
);

const array = Array.from(
  document.querySelectorAll(
    ".catalog-form__offers-unit.catalog-form__offers-unit_primary"
  )
);
console.log(array);

const smarts = {};
for (const smart of array) {
  const imgSrc = smart.querySelector("img").src;

  let price = smart.querySelector(
    ".catalog-form__description.catalog-form__description_huge-additional.catalog-form__description_font-weight_bold.catalog-form__description_condensed-other.catalog-form__description_primary"
  );
  if (price) {
    price = price.innerText.replace("от ", "");
    price = price.replace(",", ".");
    price = (parseFloat(price) / currency).toFixed(2);
  } else {
    price = "0";
  }

  const desc = smart.querySelector(".catalog-form__parameter-flex").innerText;

  smarts[
    smart
      .querySelector(
        ".catalog-form__description.catalog-form__description_primary.catalog-form__description_base-additional.catalog-form__description_font-weight_semibold.catalog-form__description_condensed-other"
      )
      .innerText.split(" (")[0]
      .replace("Смартфон ", "")
  ] = {
    price: price,
    someSpec: desc,
    img: imgSrc,
  };
}

download("catalog.json", JSON.stringify(smarts, null, 4));

//// v2023
// function download(filename, text) {
//   const element = document.createElement("a");
//   element.setAttribute(
//     "href",
//     "data:text/plain;charset=utf-8," + encodeURIComponent(text)
//   );
//   element.setAttribute("download", filename);

//   element.click();
// }

// const currency = parseFloat(
//   document
//     .querySelector("._u.js-currency-amount")
//     .innerText.replace("$ ", "")
//     .replace(",", ".")
// );

// const array = Array.from(
//   document.querySelectorAll(".schema-product.schema-product_narrow-sizes")
// );
// console.log(array);

// const smarts = {};
// for (const smart of array) {
//   const parts = smart.querySelector("img").src.split("/");
//   const imgSrc = parts.slice(parts.length - 2).join("/");

//   let price = smart.querySelector(".schema-product__price");
//   if(price){
//       price = price.innerText.replace(/[^0-9,]/g, "");
//       price = price.replace(",", ".");
//       price = (parseFloat(price) / currency).toFixed(2);
//   }
//   else{
//     price = "0";
//   }

//   const desc = smart.querySelector(".schema-product__description").innerText;

//   smarts[
//     smart.querySelector("img").title.split(" (")[0].replace("Смартфон ", "")
//   ] = {
//     price: price,
//     someSpec: desc,
//     img: imgSrc,
//   };
// }

// download("catalog.json", JSON.stringify(smarts, null, 4));
