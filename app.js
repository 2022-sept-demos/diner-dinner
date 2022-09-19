/* Imports */

import { renderDiner, renderFood } from './render-utils.js';
import { getRandomItem } from './utils.js';

/* Get DOM Elements */
const messageSection = document.getElementById('message-section');
const foodSection = document.getElementById('food-section');
const chefButton = document.getElementById('chef-button');
const dinerList = document.getElementById('diner-list');
const addDinerForm = document.getElementById('add-diner-form');
const removeDinersButton = document.getElementById('remove-diners-button');

/* State */
let message = 'Make some food to get started';
let foods = [];
let diners = [
    { name: 'Alice', drink: 'coke', food: 'pizza', hasDrink: false, hasFood: false },
    { name: 'Bill', drink: 'milkshake', food: 'burger', hasDrink: false, hasFood: false },
    { name: 'Sara', drink: 'milkshake', food: 'pizza', hasDrink: false, hasFood: false },
];

// probability arrays
const coke = { type: 'drink', name: 'coke' };
const milkshake = { type: 'drink', name: 'milkshake' };
const burger = { type: 'food', name: 'burger' };
const pizza = { type: 'food', name: 'pizza' };

const numOfFoods = [0, 1, 1, 1, 2, 2, 3];
const foodTypes = [coke, coke, coke, burger, burger, pizza, pizza, milkshake];
const dinerDrinks = [coke, coke, milkshake];
const dinerFoods = [burger, burger, burger, pizza, pizza];

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

addDinerForm.addEventListener('submit', (e) => {
    // stop the form from re-posting to the same browser page
    e.preventDefault();
    // use a form data object
    const formData = new FormData(addDinerForm);
    // make a new diner object:
    const diner = {
        name: formData.get('name'),
        drink: getRandomItem(dinerDrinks).name,
        food: getRandomItem(dinerFoods).name,
        hasDrink: false,
        hasFood: false,
    };

    diners.push(diner);
    message = `${diner.name} has been sat at a table and wants ${diner.drink} and ${diner.food}.`;
    addDinerForm.reset();

    displayDiners();
    displayMessage();
});

removeDinersButton.addEventListener('click', () => {
    const unfedDiners = [];

    for (const diner of diners) {
        if (!diner.hasDrink || !diner.hasFood) {
            unfedDiners.push(diner);
        }
    }

    diners = unfedDiners;

    displayDiners();
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

        dinerEl.addEventListener('click', () => {
            // diner has full order - message to feed someone else
            if (diner.hasDrink && diner.hasFood) {
                message = `${diner.name} has their full order, pick someone else!`;
            } else {
                // diner needs food or drink
                let drink = null;
                // look for diner drink
                for (const drinkCandidate of foods) {
                    // Does this food (drinkCandidate) match what the diner wants to drink?
                    if (drinkCandidate.name === diner.drink) {
                        // yes! store it and stop looping
                        drink = drinkCandidate;
                        break;
                    }
                    // no, keep looping
                }

                message = '';

                // either we have a "drink" or drink is still null
                if (drink) {
                    // get the index of this drink
                    const index = foods.indexOf(drink);
                    // remove it from the array
                    foods.splice(index, 1);
                    diner.hasDrink = true;
                    message += `${diner.name} was served a ${drink.name}. `;
                } else {
                    message += `Chef needs to make some ${diner.drink}. `;
                }

                let food = null;

                for (const foodCandidate of foods) {
                    if (foodCandidate.name === diner.food) {
                        food = foodCandidate;
                        break;
                    }
                }

                if (food) {
                    const index = foods.indexOf(food);
                    foods.splice(index, 1);
                    diner.hasFood = true;
                    message += `${diner.name} was served a ${food.name}.`;
                } else {
                    message += `Chef needs to make a ${diner.food}.`;
                }
            }

            // redisplay
            displayMessage();
            displayFood();
            displayDiners();
        });
    }
}

displayMessage();
displayFood();
displayDiners();
