const CAR_NUMBER_LENGTH = 8;

createButton.addEventListener("click",async () => {
  if (
    carNumberInput.value.trim().length !== CAR_NUMBER_LENGTH ||
    carBrandInput.value.trim() === "" ||
    carColorSelect.dataset[color] === "*" ||
    carReleaseYearInput.value.trim() === "" ||
    engineTypeSelect.dataset[engineType] === "*" ||
    carViolationsNumberInput.value.trim() === "" ||
    carUnpaidFinesInput.value.trim() === ""
  ) {
    createButtonP.textContent = "Fill all information!";
  } else {
    const response = await fetch("",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        
      })
    })
  }
});
