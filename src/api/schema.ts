import { register } from "@api/auth/register";
import { login } from "@api/auth/login";

//prettier-ignore
//@ts-ignore
export const schema = {
	namespaces: [
		{
			name: "auth",
			methods: [
				{
					name: "login",
					method: login,
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User authentication",
					type: "object",
					params: {
						properties: {
							login: {
								type: "string",
							},
							password: {
								type: "string",
								minLength: 8,
								maxLength: 24,
								pattern: "(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
							},
						},
						required: ["login", "password"],
						additionalProperties: false
					},
					roles: ["default"]
				},
				{
					name: "register",
					method: register,
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User registration",
					type: "object",
					params: {
						properties: {
							login: {
								type: "string",
							},
							password: {
								type: "string",
								minLength: 8,
								maxLength: 24,
								pattern: "(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
							},
							mail: {
								type: "string",
								minLength: 4,
								maxLength: 24,
								pattern: "^([\\w"+"\.\-]+)@([\\"+"w\-]+)((\.(\\"+"w){2,3})+)$"
							}
						},
						required: ["login", "password", "mail"],
						additionalProperties: false
					},
					roles: ["default"]
				},
			],
		},
		{
			namespace: "user",
			methods: [],
		},
	],
};
