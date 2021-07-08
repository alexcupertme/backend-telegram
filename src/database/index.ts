import console from "@utils/console";
import { IDatabase } from "./database.interface";

import mongoose from "mongoose";

export class Database implements IDatabase {
	private _user: string | undefined = process.env.DB_USER;
	//@ts-ignore
	private _secretKey: string | undefined = process.env.DB_SECRET_KEY;
	private _pwd: string | undefined = process.env.DB_PWD;
	private _host: string | undefined = process.env.DB_HOST;
	private _databaseName: string | undefined = process.env.DB_NAME;
	private _port: string | undefined = process.env.DB_PORT;
	private _GATEWAY: string = `mongodb+srv://${this._host}:${this._port}?retryWrites=true&w=majority`;
	constructor() {}
	connect() {
		const db = mongoose.connection;
		mongoose.connect(this._GATEWAY, {
			user: this._user,
			pass: this._pwd,
			dbName: this._databaseName,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		db.on("connected", () => {
			console.log(`Server successfully connected to database ${this._databaseName}!`);
		});
		db.on("disconnected", () => {
			console.log(`Server disconnected from database ${this._databaseName}!`);
		});
		db.on("reconnected", () => {
			console.log(`Server successfully reconnected to database ${this._databaseName}!`);
		});
		db.on("error", () => {
			console.log(`Server can't connect to database...`);
		});
	}
}
