import { IToken } from "./token.interface";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

class Token implements IToken {
	createToken(): any {
		const uuid = uuidv4();
		const expiresIn = "2d";
		return {
			uuid,
			expiresIn,
			token: jwt.sign({ uuid }, process.env.TOKEN_SECRET_KEY!, {
				expiresIn: expiresIn,
			}),
		};
	}
	verifyToken(token: string): any {
		try {
			return { data: jwt.verify(token, process.env.TOKEN_SECRET_KEY!), valid: true };
		} catch {
			return {
				data: null,
				valid: false,
			};
		}
	}
}
export = new Token();
