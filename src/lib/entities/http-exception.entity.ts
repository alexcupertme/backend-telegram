export class HttpException {
	code: number;
	data: Object;
	message: string;
	field: string | undefined;
	constructor(data: Object, code: number, message: string, field?: string) {
		this.data = data;
		this.code = code;
		this.message = message;
		this.field = field;
	}
}
