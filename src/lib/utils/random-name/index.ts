import names from "./names.json";
import { IRandomName } from "./random-name.interface";

class RandomName implements IRandomName {
	private _capFirst(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	private _getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	public generateName(): string {
		var name = `${this._capFirst(names.firstName[this._getRandomInt(0, names.firstName.length + 1)])}-${this._capFirst(
			names.lastName[this._getRandomInt(0, names.lastName.length + 1)]
		)}-${this._getRandomInt(1000000, 9999999)}`;
		return name;
	}
}

export = new RandomName();
