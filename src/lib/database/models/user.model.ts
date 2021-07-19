import { IUser } from "./user.interface";
import RandomName from "@utils/random-name";

import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	mail: String,
	name: { type: String, default: () => RandomName.generateName() },
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
	confirmCode: Number,
	role: { type: String, default: "user" },
});

const userModel = mongoose.model<IUser & mongoose.Document>("User", UserSchema);

export = userModel;
