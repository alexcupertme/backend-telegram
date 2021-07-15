"use strict";
class RandomElement {
    getRandomElement(itemContainer) {
        return itemContainer[Math.floor(Math.random() * itemContainer.length)];
    }
}
module.exports = new RandomElement();
