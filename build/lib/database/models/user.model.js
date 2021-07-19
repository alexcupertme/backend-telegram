"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const random_name_1 = __importDefault(require("@utils/random-name"));
const mongoose = __importStar(require("mongoose"));
const UserSchema = new mongoose.Schema({
    mail: String,
    name: { type: String, default: () => random_name_1.default.generateName() },
    password: String,
    registerDate: {
        type: Number,
        default: () => Date.now(),
    },
    uuid: String,
    mailVerified: {
        type: Boolean,
        default: false,
    },
    confirmId: String,
    role: { type: String, default: "user" },
});
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
