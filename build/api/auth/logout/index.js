"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const response_entity_1 = __importDefault(require("@entities/response.entity"));
const user_model_1 = __importDefault(require("@database/models/user.model"));
const _errorSchema_1 = require("@errorSchema");
const token_1 = __importDefault(require("@utils/token"));
const _errorCodes_1 = require("@errorCodes");
function logout(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenValid = yield token_1.default.verifyToken(request.headers.authorization);
        const tokenData = yield token_1.default.createToken();
        console.log(tokenValid.data.uuid);
        console.log(tokenData.uuid);
        if (!tokenValid)
            next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.incorrectToken));
        else {
            const findByUUID = yield user_model_1.default.findOne({ uuid: tokenValid.data.uuid });
            if (!findByUUID)
                next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.incorrectToken));
            else {
                yield user_model_1.default.updateOne({ uuid: tokenValid.data.uuid }, { uuid: tokenData.uuid });
                return new response_entity_1.default(request.originalUrl, "", 1, "Success!");
            }
        }
    });
}
exports.logout = logout;
