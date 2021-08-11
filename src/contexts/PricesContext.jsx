import { createContext, useEffect, useState } from "react"
import { getPrices } from "../api/crud"
import { useCurrencies } from "../hooks/useCurrencies"
import { useTickers } from "../hooks/useTickers"
import { roundTheNumber } from "../utils/functions"

export const PricesContext = createContext()

export default function PricesProvider({ children }) {
	const [currencies] = useCurrencies()
	const [prices, setPrices] = useState({})
	const [, dispatchTickers] = useTickers()

	useEffect(() => {
		let timerRequestToServer = null
		if (currencies.length > 0) {
			const currencyString = currencies.join(",")
			timerRequestToServer = setInterval(async () => {
				const [pricesData, pricesDataErr] = await getPrices(currencyString)
				if (!pricesDataErr) {
					for (let key in pricesData) {
						pricesData[key].USD = roundTheNumber(pricesData[key]?.USD)
					}
					dispatchTickers({ type: "PRICE_TICKER", payload: pricesData })
					setPrices(pricesData)
				}
			}, 5000)
		}
		return () => clearInterval(timerRequestToServer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencies])

	// useEffect(() => {
	// 	let timerRequestToServer = null
	// 	if (currencies.length > 0) {
	// 		const currencyString = currencies.join(",")
	// 		timerRequestToServer = setTimeout(async function requestToServer() {
	// 			const [pricesData, pricesDataErr] = await getPrices(currencyString)
	// 			if (!pricesDataErr) {
	// 				console.log(pricesData)
	// 			}
	// 			setTimeout(() => requestToServer(), 2000)
	// 			console.log("this")
	// 		}, 0)
	// 	}
	// 	return () => clearTimeout(timerRequestToServer)
	// }, [currencies])
	return (
		<>
			<PricesContext.Provider value={[prices, setPrices]}>
				{children}
			</PricesContext.Provider>
		</>
	)
}
