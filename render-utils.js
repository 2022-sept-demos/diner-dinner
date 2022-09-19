export function renderFood(food) {
    const img = document.createElement('img');
    // img.src = 'assets/' + food.name + '.png';
    img.src = `assets/${food.name}.png`;
    img.alt = food.name;
    return img;
}
