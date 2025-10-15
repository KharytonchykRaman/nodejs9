const CAR_NUMBER_LENGTH = 8;

function validateCarNumber(carNumberStr) {
    if (carNumberStr.length !== CAR_NUMBER_LENGTH
        || !isFinite(carNumberStr[0]) || !isFinite(carNumberStr[1])
        || !isFinite(carNumberStr[2]) || !isFinite(carNumberStr[3])
        || carNumberStr[4] !== "-" || isFinite(carNumberStr[5])
        || isFinite(carNumberStr[6]) || !isFinite(carNumberStr[7])) {
        return false
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

    cardsContainer.innerHTML += result;
}

function renderSeveralCards(carsArray) {
    if (carsArray.length === 0) {
        cardsContainer.textContent = "No cars found";
        return;
    }
    carsArray.map(car => renderCard(car));
}

createButton.addEventListener("click", async () => {
    if (!validateCarNumber(carNumberInput.value.trim())) {
        createButtonP.textContent = "Number is incorrect!"
    }
    else if (
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
            body: JSON.stringify(car)
        })
        const data = await response.text();

        responseText.textContent = data;

        if (response.ok) renderCard(car);

    }
});

cardsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("editButton")) {
        const card = e.target.closest(".stolen-car-card");
        const carNumber = card.dataset.number;
    }
    else if (e.target.classList.contains("deleteButton")) {
        const card = e.target.closest(".stolen-car-card");
        const carNumber = card.dataset.number;
        deleteCard(carNumber, card);
    }
})

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

const start = async () => {
    const response = await fetch("/car-violation/all");
    const data = await response.json();

    renderSeveralCards(data);
}



start();