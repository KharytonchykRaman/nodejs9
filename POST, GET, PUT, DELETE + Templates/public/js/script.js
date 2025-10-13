function renderDevice(device) {
  if (!device) {
    devicePriceId.value = 0;
    deviceSomeSpecId.value = 0;
    devicePriceId.value = 0;
    deviceImgId.src = "/img/error.jpg";
    deviceImgSrcId.value = "";
    deviceImgId.style.display = "block";
    return;
  }

  document.title = device.name;
  deviceNameId.value = device.name;
  devicePriceId.value = `$${device.price}`;
  deviceSomeSpecId.value = device.someSpec;

  deviceImgId.style.display = "block";
  if (device.img.includes("http")) deviceImgSrcId.value = device.img;
  else
    deviceImgSrcId.value = `https://content2.onliner.by/catalog/device/${device.img}`;

  deviceImgId.src = deviceImgSrcId.value;
}

async function getDeviceByName() {
  const response = await fetch(
    `/api/catalog/device/get?name=${deviceNameId.value}`
  );
  // {
  // method: "GET", можно не писать -- по умолчанию GET
  // body: sendData, не может быть! тела у GET-запросика. Придётся публичить данные в пути
  // }

  //true, если вернулся статус-код 200
  if (response.ok) {
    const responseObj = await response.json();
    console.log(responseObj);
    console.log(`type: ${typeof responseObj}`);

    renderDevice(responseObj);
    return;
  }

  const responseText = await response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function postDeviceByName() {
  const response = await fetch(`/api/catalog/device/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: deviceNameId.value,
    }),
  });

  //true, если вернулся статус код 200
  if (response.ok) {
    const responseObj = await response.json();
    console.log(responseObj);
    console.log(`type: ${typeof responseObj}`);

    renderDevice(responseObj);
    return;
  }

  const responseText = await response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function addDevice() {
  const response = await fetch("/api/catalog/device/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: deviceNameId.value,
      price: devicePriceId.value,
      someSpec: deviceSomeSpecId.value,
      imgSrc: deviceImgSrcId.value,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    deviceSomeSpecId.value = `UPDATED`;
    setTimeout(() => {
      renderDevice(responseData);
    }, 1500);
    return;
  }
  //извлекаем строку ответа
  const responseText = response.text();
  deviceSomeSpecId.value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function putSmartphone() {
  const response = await fetch("/api/catalog/device/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subname: deviceNameId.value,
      price: devicePriceId.value,
      someSpec: deviceSomeSpecId.value,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    deviceSomeSpecId.value = `UPDATED`;
    setTimeout(() => {
      renderDevice(responseData);
    }, 1000);
    return;
  }
  const responseText = response.text();
  deviceSomeSpecId.value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function deleteDeviceByName() {
  const name = deviceNameId.value;
  const response = await fetch(`/api/catalog/device/delete?name=${name}`, {
    method: "DELETE",
  });

  //т.к. ответ сервера в любом случае текст, а не JSON
  //можем сразу получить его как строку
  const responseText = await response.text();
  if (response.ok) {
    deviceSomeSpecId.value = `DELETED: ${responseText}`;
    deviceImgId.src = "/img/delete.png";
    return;
  }

  deviceSomeSpecId.value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

deviceNameId.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("button").click();
  }
});
