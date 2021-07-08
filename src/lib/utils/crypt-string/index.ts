import { ICryptString } from "./crypt-string.interface";

import argon2 from "argon2";

class CryptString implements ICryptString {
	async crypt(str: string): Promise<string> {
		return await argon2.hash(str);
	}
	async check(hash: string, str: string): Promise<boolean> {
		return await argon2.verify(hash, str);
	}
}

export = new CryptString();
