import { createContext, useEffect, useState } from "react"
import { getPrices } from "../api/crud"
import { useCurrents } from "../hooks/useCurrents"
import { useTickers } from "../hooks/useTickers"
import { roundTheNumber } from "../utils/functions"

export const PricesContext = createContext()

export default function PricesProvider({ children }) {
	const [currents] = useCurrents()
	const [prices, setPrices] = useState({})
	const [, dispatchTickers] = useTickers()

	useEffect(() => {
		let timerRequestToServer = null
		if (currents.length > 0) {
			const currentString = currents.join(",")
			timerRequestToServer = setInterval(async () => {
				const [pricesData, pricesDataErr] = await getPrices(currentString)
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
	}, [currents])

	// useEffect(() => {
	// 	let timerRequestToServer = null
	// 	if (currents.length > 0) {
	// 		const currentString = currents.join(",")
	// 		timerRequestToServer = setTimeout(async function requestToServer() {
	// 			const [pricesData, pricesDataErr] = await getPrices(currentString)
	// 			if (!pricesDataErr) {
	// 				console.log(pricesData)
	// 			}
	// 			setTimeout(() => requestToServer(), 2000)
	// 			console.log("this")
	// 		}, 0)
	// 	}
	// 	return () => clearTimeout(timerRequestToServer)
	// }, [currents])
	return (
		<>
			<PricesContext.Provider value={[prices, setPrices]}>
				{children}
			</PricesContext.Provider>
		</>
	)
}
