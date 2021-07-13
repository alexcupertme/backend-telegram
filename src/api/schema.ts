import { register } from "@api/auth/register";
import { login } from "@api/auth/login";
import { test } from "@api/user/test";

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
					type: "POST",
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User authentication",
					params: {
						properties: {
							mail: {
								type: "string",
								minLength: 4,
								maxLength: 24,
								pattern: "^([\\w"+"\.\-]+)@([\\"+"w\-]+)((\.(\\"+"w){2,3})+)$"
							},
							password: {
								type: "string",
								minLength: 8,
								maxLength: 24,
								pattern: "(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
							},
						},
						required: ["mail", "password"],
						additionalProperties: false
					},
					roles: ["default"]
				},
				{
					name: "register",
					method: register,
					type: "POST",
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User registration",
					params: {
						properties: {
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
						required: ["password", "mail"],
						additionalProperties: false
					},
					roles: ["default"]
				},
			],
		},
		{
			name: "user",
			methods: [
				{
					name: "test",
					method: test,
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "Test",
					type: "object",
					params: {
						properties: {},
						additionalProperties: false
					},
					roles: ["unverified"]
				},
			],
		},
	],
};
