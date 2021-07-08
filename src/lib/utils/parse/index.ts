import { IParse } from "./parse-numbers.interface";

class ParseNumber implements IParse {
	parseNumber(str: string): number {
		return parseInt(str.replace(/[^0-9]/g, "")) != undefined && parseInt(str.replace(/[^0-9]/g, "")) != null && !isNaN(parseInt(str.replace(/[^0-9]/g, ""))) ? parseInt(str.replace(/[^0-9]/g, "")) : 0;
	}
}

export = new ParseNumber();
