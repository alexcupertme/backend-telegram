class ResponseSchema {
	data: Object;
	action: string;
	message: string;
	constructor(action: string, data: Object, message: string) {
		this.action = action;
		this.data = data;
		this.message = message;
	}
}

export default ResponseSchema;
