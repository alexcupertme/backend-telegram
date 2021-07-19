"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
exports.ErrorCodes = {
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
        noVerifiedMail: {
            httpStatus: 400,
            code: 40011,
            textCode: "ERR_VERIFICATION_MAIL_REQUIRED",
            msg: "You need to verify your mail first!",
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
