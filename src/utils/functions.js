export function roundTheNumber(number) {
	if (number > 1) {
		return number.toFixed(2)
	} else {
		return number.toPrecision(2)
	}
}
