"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Constants {
}
exports.Constants = Constants;
Constants.SERVER_PORT = process.env.SERVER_PORT;
Constants.DB_HOST = process.env.DB_HOST;
Constants.DB_USER = process.env.DB_USER;
Constants.DB_PWD = process.env.DB_PWD;
Constants.TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
Constants.DB_NAME = process.env.DB_NAME;
Constants.SIB_TOKEN = process.env.SIB_TOKEN;
Constants.DB_PORT = process.env.DB_PORT;
Constants.ErrorCodes = {
    badRequest: {
        incorrectAuth: {
            httpStatus: 400,
            code: 40001,
            textCode: "ERR_INCORRECT_AUTH",
            msg: "Incorrect login or password!",
        },
        mailWasTaken: {
            httpStatus: 400,
            code: 40002,
            textCode: "ERR_MAIL_ALREADY_REGISTERED",
            msg: "This mail already registered!",
        },
        loginWasTaken: {
            httpStatus: 400,
            code: 40003,
            textCode: "ERR_LOGIN_ALREADY_REGISTERED",
            msg: "This login already registered!",
        },
        unknownMethod: {
            httpStatus: 400,
            code: 40003,
            textCode: "ERR_UNKNOWN_METHOD",
            msg: "Requested method does not exists!",
        },
        unknownNamespace: {
            httpStatus: 400,
            code: 40004,
            textCode: "ERR_UNKNOWN_NAMESPACE",
            msg: "Requested namespace does not exists!",
        },
        emptyFields: {
            httpStatus: 400,
            code: 40005,
            textCode: "ERR_EMPTY_FIELDS",
            msg: "Some required fields are empty!",
        },
        fieldsError: {
            httpStatus: 400,
            code: 40006,
            textCode: "ERR_ERROR_FIELDS",
            msg: "Some fields has incorrect format!",
        },
        invalidApiVersion: {
            httpStatus: 400,
            code: 40007,
            textCode: "ERR_INCORRECT_API_V",
            msg: "Check your API version and try again!",
        },
        incorrectToken: {
            httpStatus: 400,
            code: 40008,
            textCode: "ERR_INCORRECT_TOKEN",
            msg: "Incorrect token!",
        },
        noToken: {
            httpStatus: 400,
            code: 40009,
            textCode: "ERR_NO_TOKEN",
            msg: "This request requires token authorization!",
        },
        accessDenied: {
            httpStatus: 400,
            code: 40010,
            textCode: "ERR_ACCESS_DENIED",
            msg: "You cannot request this method!",
        },
    },
    serverError: {
        default: {
            httpStatus: 500,
            code: 50001,
            textCode: "ERR_SERVER_ERROR",
            msg: "Something went wrong!",
        },
        databaseError: {
            httpStatus: 500,
            code: 50002,
            textCode: "ERR_DATABASE_ERROR",
            msg: "The server is currently unable to process your request. Try it in 5 minutes!",
        },
    },
};
