/**
 *
 * @param str your string with numbers
 * @returns
 */
export function parseNumber(str: string): number {
	return parseInt(str.replace(/[^0-9]/g, "")) != undefined && parseInt(str.replace(/[^0-9]/g, "")) != null && !isNaN(parseInt(str.replace(/[^0-9]/g, ""))) ? parseInt(str.replace(/[^0-9]/g, "")) : 0;
}
