import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	mail: string;
	name: string;
	password: string;
	registerDate: number;
	role: string;
	uuid: string;
}
