// Auth routes
import { register } from "@api/auth/register";
import { login } from "@api/auth/login";
import { logout } from "@api/auth/logout";
// import { verifyMail } from "@api/auth/verify-mail";

// User routes
import { test } from "@api/user/test";

import { ISchema } from "./schema.interface";

//prettier-ignore
//@ts-ignore
export const schema: ISchema = {
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
					body: {
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
					query: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					roles: ["default"],
					mailVerification: false,
				},
				{
					name: "register",
					method: register,
					type: "POST",
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User registration",
					body: {
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
								maxLength: 40,
								pattern: "^([\\w"+"\.\-]+)@([\\"+"w\-]+)((\.(\\"+"w){2,3})+)$"
							}
						},
						required: ["password", "mail"],
						additionalProperties: false	
					},
					query: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					roles: ["default"],
					mailVerification: false,
				},
				{
					name: "logout",
					method: logout,
					type: "POST",
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "Token deactivation",
					body: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					query: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					roles: ["user"],
					mailVerification: false,
				},
				{
					name: "verify-mail",
					method: login,
					type: "POST",
					minVersion: 1.0,
					maxVersion: 1.0,
					description: "User activation by mail",
					body: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					query: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					roles: ["user"],
					mailVerification: false,
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
					type: "GET",
					body: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					query: {
						properties: {},
						additionalProperties: false,
						required: []
					},
					roles: ["user"],
					mailVerification: true,
				},
			],
		},
	],
};
