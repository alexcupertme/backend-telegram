import names from "./names.json";

class RandomName {
	private _capFirst(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	private _getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	public generateName() {
		var name = `${this._capFirst(names.firstName[this._getRandomInt(0, names.firstName.length + 1)])}-${this._capFirst(names.lastName[this._getRandomInt(0, names.lastName.length + 1)])}-${
			this._getRandomInt
		}`;
		return name;
	}
}

export = new RandomName();
