export class HttpException {
	data: Object;
	message: string;
	error: any;
	constructor(data: Object, message: string, error: any) {
		this.data = data;
		this.message = message;
		this.error = error;
	}
}
