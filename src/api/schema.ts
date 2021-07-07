//prettier-ignore
//@ts-ignore
export const schema = {
	namespaces: [
		{
			namespace: "auth",
			methods: [
				{
					name: "login",
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
					},
				},
			],
		},
		{
			namespace: "user",
			methods: [],
		},
	],
};
