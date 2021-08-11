export function roundTheNumber(number) {
	if (number > 1) {
		return number.toFixed(2)
	} else {
		return number.toPrecision(2)
	}
}
export function normalizePrice(countArray) {
	const maxValue = Math.max(...countArray)
	const minValue = Math.min(...countArray)
	return countArray.map(
		price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
	)
}
