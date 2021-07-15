"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
class Token {
    createToken() {
        const uuid = uuid_1.v4();
        const expiresIn = "2d";
        return {
            uuid,
            expiresIn,
            token: jsonwebtoken_1.default.sign({ uuid }, process.env.TOKEN_SECRET_KEY, {
                expiresIn: expiresIn,
            }),
        };
    }
    verifyToken(token) {
        try {
            return { data: jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY), valid: true };
        }
        catch (_a) {
            return {
                data: null,
                valid: false,
            };
        }
    }
}
module.exports = new Token();
