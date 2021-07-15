"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const names_json_1 = __importDefault(require("./names.json"));
class RandomName {
    _capFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    generateName() {
        var name = `${this._capFirst(names_json_1.default.firstName[this._getRandomInt(0, names_json_1.default.firstName.length + 1)])}-${this._capFirst(names_json_1.default.lastName[this._getRandomInt(0, names_json_1.default.lastName.length + 1)])}-${this._getRandomInt(1000000, 9999999)}`;
        return name;
    }
}
module.exports = new RandomName();
