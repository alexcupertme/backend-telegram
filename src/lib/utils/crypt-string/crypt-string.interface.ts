export interface ICryptString {
	crypt(str: string): Promise<string>;
	check(hash: string, str: string): Promise<boolean>;
}
