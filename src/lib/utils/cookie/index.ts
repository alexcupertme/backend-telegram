import { ICookie } from "./cookie.interface";

class Cookie implements ICookie {
	createCookie(token: string, expiresIn: string): string {
		return `Authorization=${token}; HttpOnly; Max-Age=${expiresIn}; Path=/api/`;
	}
}

export = new Cookie();
