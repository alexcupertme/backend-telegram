"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const register_1 = require("@api/auth/register");
const login_1 = require("@api/auth/login");
const logout_1 = require("@api/auth/logout");
const test_1 = require("@api/user/test");
exports.schema = {
    namespaces: [
        {
            name: "auth",
            methods: [
                {
                    name: "login",
                    method: login_1.login,
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
                                pattern: "^([\\w" + "\.\-]+)@([\\" + "w\-]+)((\.(\\" + "w){2,3})+)$"
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
                        properties: {
                            boba: {
                                type: "string"
                            }
                        },
                        additionalProperties: false,
                        required: ["boba"]
                    },
                    roles: ["default"],
                    mailVerification: false,
                },
                {
                    name: "register",
                    method: register_1.register,
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
                                pattern: "^([\\w" + "\.\-]+)@([\\" + "w\-]+)((\.(\\" + "w){2,3})+)$"
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
                    method: logout_1.logout,
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
                    method: login_1.login,
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
                    method: test_1.test,
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
