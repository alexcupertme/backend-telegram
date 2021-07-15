"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const randexp_1 = __importDefault(require("randexp"));
class RandomExpString {
    generateString(regexp, count) {
        const genArr = [];
        for (let i = 0; i < count; i++) {
            genArr.push(new randexp_1.default(regexp).gen());
        }
        return genArr;
    }
}
module.exports = new RandomExpString();
