export interface ICookie {
	createCookie(token: string, expiresIn: string): string;
}
