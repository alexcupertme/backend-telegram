"use strict";
class ParseNumber {
    parseNumber(str) {
        return parseInt(str.replace(/[^0-9]/g, "")) != undefined && parseInt(str.replace(/[^0-9]/g, "")) != null && !isNaN(parseInt(str.replace(/[^0-9]/g, ""))) ? parseInt(str.replace(/[^0-9]/g, "")) : 0;
    }
}
module.exports = new ParseNumber();
