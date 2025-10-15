const CAR_NUMBER_LENGTH = 8;

function validateCarNumber(carNumberStr) {
  if (
    carNumberStr.length !== CAR_NUMBER_LENGTH ||
    !isFinite(carNumberStr[0]) ||
    !isFinite(carNumberStr[1]) ||
    !isFinite(carNumberStr[2]) ||
    !isFinite(carNumberStr[3]) ||
    carNumberStr[4] !== "-" ||
    isFinite(carNumberStr[5]) ||
    isFinite(carNumberStr[6]) ||
    !isFinite(carNumberStr[7])
  ) {
    return false;
  }
  return true;
}

function implementObjInTemplate(obj, templateStr) {
  let result = templateStr;
  for (const key in obj) {
    result = result.replaceAll(`{{${key}}}`, obj[key]);
  }
  return result;
}

function renderCard(carObj) {
  const templateHtml = template.innerHTML;

  const result = implementObjInTemplate(carObj, templateHtml);

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = result.trim();

  while (tempDiv.firstChild) {
    cardsContainer.appendChild(tempDiv.firstChild);
  }
}

function renderSeveralCards(carsArray) {
  cardsContainer.innerHTML = "";
  if (carsArray.length === 0) {
    cardsContainer.textContent = "No cars found";
    return;
  }
  carsArray.map((car) => renderCard(car));
}

createButton.addEventListener("click", async () => {
  if (!validateCarNumber(carNumberInput.value.trim())) {
    createButtonP.textContent = "Number is incorrect!";
  } else if (
    carBrandInput.value.trim() === "" ||
    carColorSelect.value === "*" ||
    carReleaseYearInput.value.trim() === "" ||
    engineTypeSelect.value === "*" ||
    carViolationsNumberInput.value.trim() === "" ||
    carUnpaidFinesInput.value.trim() === ""
  ) {
    createButtonP.textContent = "Fill all necessary information!";
  } else {
    createButtonP.textContent = "";
    const car = {
      brand: carBrandInput.value.trim(),
      number: carNumberInput.value.trim().toUpperCase(),
      colorWord: carColorSelect.value,
      releaseYear: carReleaseYearInput.value.trim(),
      engineType: engineTypeSelect.value,
      violationsNumber: carViolationsNumberInput.value.trim(),
      unpaidFines: carUnpaidFinesInput.value.trim(),
      imgSrc: carImgSrcInput.value.trim(),
    };
    const response = await fetch("/adminpage/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    const data = await response.text();

    responseText.textContent = data;

    if (response.ok) renderCard(car);
  }
});

cardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("editButton")) {
    const card = e.target.closest(".stolen-car-card");
    const carNumber = card.dataset.number;
    editCard(carNumber, card);
  } else if (e.target.classList.contains("deleteButton")) {
    const card = e.target.closest(".stolen-car-card");
    const carNumber = card.dataset.number;
    deleteCard(carNumber, card);
  }
});

async function deleteCard(carNumber, cardElement) {
  const response = await fetch(`/adminpage/delete?number=${carNumber}`, {
    method: "DELETE",
  });

  if (response.ok) {
    cardElement.remove();
  }

  const data = await response.text();
  responseText.textContent = data;
}

async function editCard(carNumber, cardElement) {
  const editBtn = cardElement.querySelector(".editButton");
  editBtn.disabled = true;
  editBtn.textContent = "editing...";

  const brandDiv = cardElement.querySelector(".brand");
  const colorDiv = cardElement.querySelector(".color-swatch");
  const releaseYearDiv = cardElement.querySelector(".releaseYear");
  const engineTypeDiv = cardElement.querySelector(".engineType");
  const violationsNumberDiv = cardElement.querySelector(".violationsNumber");
  const unpaidFinesDiv = cardElement.querySelector(".unpaidFines");

  const divs = [
    brandDiv,
    colorDiv,
    releaseYearDiv,
    engineTypeDiv,
    violationsNumberDiv,
    unpaidFinesDiv,
  ];
  const childs = [
    carBrandInput,
    carColorSelect,
    carReleaseYearInput,
    engineTypeSelect,
    carViolationsNumberInput,
    carUnpaidFinesInput,
  ];

  const startValues = [];

  divs.forEach((div, index) => {
    const tc = div.textContent;
    startValues.push(tc);
    div.textContent = "";
    const child = childs[index].cloneNode(true);
    child.removeAttribute("id");
    child.value = tc;
    div.appendChild(child);
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "cancel";
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "accept";

  cardElement.querySelector(".info").appendChild(cancelButton);
  cardElement.querySelector(".info").appendChild(acceptButton);


  cancelButton.addEventListener("click", () => {
    divs.forEach((div, index) => {
      div.innerHTML = "";
      div.textContent = startValues[index];
    });
    editBtn.disabled = false;
    editBtn.textContent = "edit";

    acceptButton.remove();
    cancelButton.remove();
  });

  acceptButton.addEventListener("click", async () => {
    divs.forEach((div, index) => {
      const newValue = div.firstChild.value;
      div.innerHTML = "";
      div.textContent = newValue;
    });

    const response = await fetch("/adminpage/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: brandDiv.textContent.trim(),
        number: carNumber,
        colorWord: colorDiv.textContent,
        releaseYear: releaseYearDiv.textContent.trim(),
        engineType: engineTypeDiv.textContent,
        violationsNumber: violationsNumberDiv.textContent.trim(),
        unpaidFines: unpaidFinesDiv.textContent.trim(),
        imgSrc: cardElement.querySelector(".car-photo").src,
      }),
    });
    const data = await response.text();
    responseText.textContent = data;

    editBtn.disabled = false;
    editBtn.textContent = "edit";
          
    cancelButton.remove();
    acceptButton.remove();
  });
}

firstFetchButton.addEventListener("click", async (e) => {
  const response = await fetch("/car-violation/filter?brand=ford");
  const data = await response.json();

  renderSeveralCards(data);
  e.stopPropagation();
});

secondFetchButton.addEventListener("click", async (e) => {
  const response = await fetch("/car-violation/filter?engineType=gasoline");
  const data = await response.json();

  renderSeveralCards(data);
  e.stopPropagation();
});

thirdFetchButton.addEventListener("click", async (e) => {
  const response = await fetch(
    "/car-violation/filter?engineType=gasoline&colorWord=white"
  );
  const data = await response.json();

  renderSeveralCards(data);
  e.stopPropagation();
});

fourthFetchButton.addEventListener("click", async (e) => {
  const response = await fetch("/car-violation/all");
  const data = await response.json();

  renderSeveralCards(data);
  e.stopPropagation();
});

const start = async () => {
  const response = await fetch("/car-violation/all");
  const data = await response.json();

  renderSeveralCards(data);
};

start();
