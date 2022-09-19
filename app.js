/* Imports */

import { renderDiner, renderFood } from './render-utils.js';
import { getRandomItem } from './utils.js';

/* Get DOM Elements */
const messageSection = document.getElementById('message-section');
const foodSection = document.getElementById('food-section');
const chefButton = document.getElementById('chef-button');
const dinerList = document.getElementById('diner-list');

/* State */
let message = 'Alice is full';
let foods = [];
let diners = [
    { name: 'Alice', drink: 'coke', food: 'pizza', hasDrink: false, hasFood: false },
    { name: 'Ted', drink: 'coke', food: 'burger', hasDrink: true, hasFood: false },
    { name: 'Bill', drink: 'milkshake', food: 'burger', hasDrink: true, hasFood: true },
    { name: 'Sara', drink: 'milkshake', food: 'pizza', hasDrink: true, hasFood: true },
];

// probability arrays
const coke = { type: 'drink', name: 'coke' };
const milkshake = { type: 'drink', name: 'milkshake' };
const burger = { type: 'food', name: 'burger' };
const pizza = { type: 'food', name: 'pizza' };

const numOfFoods = [0, 1, 1, 1, 2, 2, 3];
const foodTypes = [coke, coke, coke, burger, burger, pizza, pizza, milkshake];

/* Events */
chefButton.addEventListener('click', () => {
    // get a random number of food items
    const howMany = getRandomItem(numOfFoods);

    // loop for each food we need to create
    for (let i = 0; i < howMany; i++) {
        //      get a random food
        const foodType = getRandomItem(foodTypes);
        //      create a food object
        const food = {
            name: foodType.name,
            type: foodType.type,
        };
        //      push into foods array
        foods.push(food);
    }
    // display a message of how many foods
    // redisplay foods
    displayFood();
});

/* Display Functions */
function displayMessage() {
    messageSection.textContent = message;
}

function displayFood() {
    foodSection.innerHTML = '';

    for (let food of foods) {
        const foodEl = renderFood(food);
        foodSection.append(foodEl);
    }
}

function displayDiners() {
    dinerList.innerHTML = '';

    for (const diner of diners) {
        const dinerEl = renderDiner(diner);
        dinerList.append(dinerEl);
    }
}

displayMessage();
displayFood();
displayDiners();
