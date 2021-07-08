export interface IToken {
	createToken(source: any): string;
	verifyToken(token: string): any;
}
