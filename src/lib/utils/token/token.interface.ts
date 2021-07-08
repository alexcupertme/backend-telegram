export interface IToken {
	createToken(source: any): any;
	verifyToken(token: string): any;
}
