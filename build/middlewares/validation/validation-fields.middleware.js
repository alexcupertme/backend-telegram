"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidation = void 0;
const _errorSchema_1 = require("@errorSchema");
const _errorCodes_1 = require("@errorCodes");
const ajv_1 = __importDefault(require("ajv"));
class FieldsValidation {
    _parseError(type, keyword, message, propName) {
        switch (keyword) {
            case "required":
                return new _errorSchema_1.HttpException(0, `${type}: Request ${message}${propName != "" ? ` in '${propName}'` : ""}`, _errorCodes_1.ErrorCodes.badRequest.emptyFields);
            case "pattern":
                return new _errorSchema_1.HttpException(0, `${type}: Incorrect format of property '${propName}'`, _errorCodes_1.ErrorCodes.badRequest.fieldsError);
            case "maxLength":
                return new _errorSchema_1.HttpException(0, `${type}: Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError);
            case "minLength":
                return new _errorSchema_1.HttpException(0, `${type}: Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError);
            case "type":
                return new _errorSchema_1.HttpException(0, `${type}: Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError);
        }
    }
    _validate(data, params, type) {
        console.log(456124125);
        const ajv = new ajv_1.default({ strict: false, removeAdditional: true });
        const validate = ajv.compile(params);
        validate(data);
        if (!validate.errors)
            return null;
        else {
            console.log(777);
            const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
            const message = validate.errors[0].message;
            const fieldsError = this._parseError(type, validate.errors[0].keyword, message, propName);
            if (fieldsError)
                return fieldsError;
            else
                return new _errorSchema_1.HttpException(0, `Unhandler field error!`, _errorCodes_1.ErrorCodes.badRequest.fieldsError);
        }
    }
    fieldsValidationMiddleware(request, response, next) {
        const bodyErr = this._validate(request.body, response.locals.methodEl.body, "Body");
        console.log(124123);
        const queryErr = this._validate(request.query, response.locals.methodEl.query, "Query");
        if (!bodyErr && !queryErr)
            next();
        else
            next(bodyErr != null ? bodyErr : queryErr);
    }
}
exports.FieldsValidation = FieldsValidation;
