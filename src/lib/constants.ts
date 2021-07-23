import dotenv from "dotenv";
dotenv.config();

export abstract class Constants {
	static readonly SERVER_PORT = process.env.SERVER_PORT;
	static readonly DB_HOST = process.env.DB_HOST;
	static readonly DB_USER = process.env.DB_USER;
	static readonly DB_PWD = process.env.DB_PWD;
	static readonly TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
	static readonly DB_NAME = process.env.DB_NAME;
	static readonly SP_ID = process.env.SP_ID;
	static readonly SP_SECRET = process.env.SP_SECRET;
	static readonly DB_PORT = process.env.DB_PORT;
	static readonly ErrorCodes = {
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
}
