export const ErrorCodes = {
	badRequest: {
		incorrectAuth: {
			code: 40001,
			textCode: "ERR_INCORRECT_AUTH",
			msg: "Incorrect login or password!",
		},
		mailWasTaken: {
			code: 40002,
			textCode: "ERR_MAIL_ALREADY_REGISTERED",
			msg: "This mail already registered!",
		},
		loginWasTaken: {
			code: 40003,
			textCode: "ERR_LOGIN_ALREADY_REGISTERED",
			msg: "This login already registered!",
		},
		unknownMethod: {
			code: 40003,
			textCode: "ERR_UNKNOWN_METHOD",
			msg: "Requested method does not exists!",
		},
		unknownNamespace: {
			code: 40004,
			textCode: "ERR_UNKNOWN_NAMESPACE",
			msg: "Requested namespace does not exists!",
		},
		emptyFields: {
			code: 40005,
			textCode: "ERR_EMPTY_FIELDS",
			msg: "Some required fields are empty!",
		},
		fieldsError: {
			code: 40006,
			textCode: "ERR_ERROR_FIELDS",
			msg: "Some fields has incorrect format!",
		},
		invalidApiVersion: {
			code: 40007,
			textCode: "ERR_INCORRECT_API_V",
			msg: "Check your API version and try again!",
		},
		incorrectToken: {
			code: 40008,
			textCode: "ERR_INCORRECT_TOKEN",
			msg: "Incorrect token!",
		},
		noToken: {
			code: 40009,
			textCode: "ERR_NO_TOKEN",
			msg: "This request requires token authorization!",
		},
	},
	serverError: {
		default: {
			code: 50001,
			textCode: "ERR_SERVER_ERROR",
			msg: "Something went wrong!",
		},
		databaseError: {
			code: 50002,
			textCode: "ERR_DATABASE_ERROR",
			msg: "The server is currently unable to process your request. Try it in 5 minutes!",
		},
	},
};
