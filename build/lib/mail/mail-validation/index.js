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
const _constants_1 = require("@constants");
const console_1 = __importDefault(require("@utils/console"));
const get_mail_content_1 = require("./get-mail-content");
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("@database/models/user.model"));
const uuid_1 = require("uuid");
class MailValidation {
    addToConfirmation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const confirmId = uuid_1.v4();
                yield user_model_1.default.updateOne({ email }, { confirmId });
                const data = yield axios_1.default({
                    method: "POST",
                    url: "https://api.sendinblue.com/v3/smtp/email",
                    headers: {
                        accept: "application/json",
                        "api-key": _constants_1.Constants.SIB_TOKEN,
                        "content-type": "application/json",
                    },
                    data: {
                        sender: {
                            name: "BotFactory Ltd",
                            email: "support@botsfactory.ru",
                        },
                        to: [
                            {
                                email,
                            },
                        ],
                        subject: "Успешная регистрация! | BotFactory Ltd",
                        htmlContent: get_mail_content_1.getMailContent(email, confirmId),
                    },
                });
                return data.data ? data.data : null;
            }
            catch (e) {
                console_1.default.error(e.response.data);
            }
        });
    }
}
module.exports = new MailValidation();
