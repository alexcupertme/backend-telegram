"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const console_1 = __importDefault(require("@utils/console"));
const _constants_1 = require("@constants");
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this._user = _constants_1.Constants.DB_USER;
        this._pwd = _constants_1.Constants.DB_PWD;
        this._host = _constants_1.Constants.DB_HOST;
        this._databaseName = _constants_1.Constants.DB_NAME;
        this._port = _constants_1.Constants.DB_PORT;
        this._GATEWAY = `mongodb+srv://${this._host}:${this._port}?retryWrites=true&w=majority`;
    }
    connect() {
        const db = mongoose_1.default.connection;
        mongoose_1.default.connect(this._GATEWAY, {
            user: this._user,
            pass: this._pwd,
            dbName: this._databaseName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        db.on("connected", () => {
            console_1.default.log(`Server successfully connected to database ${this._databaseName}!`);
        });
        db.on("disconnected", () => {
            console_1.default.log(`Server disconnected from database ${this._databaseName}!`);
        });
        db.on("reconnected", () => {
            console_1.default.log(`Server successfully reconnected to database ${this._databaseName}!`);
        });
        db.on("error", () => {
            console_1.default.log(`Server can't connect to database...`);
        });
    }
}
exports.Database = Database;
