export function renderFood(food) {
    const img = document.createElement('img');
    // img.src = 'assets/' + food.name + '.png';
    img.src = `assets/${food.name}.png`;
    img.alt = food.name;
    return img;
}

export function renderDiner(diner) {
    const li = document.createElement('li');
    const emoji = document.createElement('span');

    if (diner.hasDrink && diner.hasFood) {
        emoji.textContent = '😋';
    } else if (diner.hasDrink || diner.hasFood) {
        emoji.textContent = '😐';
    } else {
        emoji.textContent = '😒';
    }

    const name = document.createElement('span');
    name.textContent = diner.name;

    const foodImage = document.createElement('img');
    foodImage.src = `assets/${diner.food}.png`;
    foodImage.alt = diner.food;

    const drinkImage = document.createElement('img');
    drinkImage.src = `assets/${diner.drink}.png`;
    drinkImage.alt = diner.drink;

    li.append(emoji, name, foodImage, drinkImage);
    return li;
}
