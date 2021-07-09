export type TokenType = {
	uuid: string;
	expiresIn: string;
	token: string;
};
export interface IToken {
	createToken(source: any): any;
	verifyToken(token: string): any;
}
