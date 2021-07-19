export type IType = "POST" | "GET" | "PUT" | "PATCH" | "OPTIONS" | "DELETE";

export type IRoles = "default" | "user" | "free" | "business" | "enterprise" | "support" | "admin" | "moderator" | "owner";

export type IMethod = {
	name: string;
	method: any;
	type: IType;
	minVersion: number;
	maxVersion: number;
	description: string;
	params: {
		properties: any;
		required: any[];
		additionalProperties: boolean;
	};
	roles: IRoles[];
	mailVerification: boolean;
};

export type INamespace = {
	name: string;
	methods: IMethod[];
};

export type ISchema = {
	namespaces: INamespace[];
};
