import colorNamer from 'https://cdn.skypack.dev/color-namer';

carColorInput.addEventListener('input', () => {
    const hex = carColorInput.value;
    const names = colorNamer(hex);
    const closestName = names.basic[0]?.name || 'unknown';
    createButton.textContent = closestName;
}); 