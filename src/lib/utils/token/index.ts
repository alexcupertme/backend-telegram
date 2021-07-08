import { IToken } from "./token.interface";

import jwt from "jsonwebtoken";

class Token implements IToken {
	createToken(source: any): string {
		return jwt.sign(source, process.env.TOKEN_SECRET_KEY!, {
			expiresIn: "48h",
		});
	}
	verifyToken(source: any): any {
		try {
			return { data: jwt.verify(source, process.env.TOKEN_SECRET_KEY!), valid: true };
		} catch {
			return {
				data: null,
				valid: false,
			};
		}
	}
}
export = new Token();
