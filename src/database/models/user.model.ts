import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	mail: String,
	login: String,
	password: String,
	registerDate: {
		type: Number,
		default: Date.now(),
	},
	role: { type: String, default: "unverified" },
});

const userModel = mongoose.model<mongoose.Document>("User", UserSchema);

export = userModel;
