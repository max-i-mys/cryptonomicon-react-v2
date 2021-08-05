import { createContext, useEffect, useState } from "react"
import { getActualCoins } from "../api/crud"

export const ValidateContext = createContext()
export default function ValidateProvider({ children }) {
	const [thereIsCoins, setThereIsCoins] = useState("Error")
	const [switchLoadingTickers, setSwitchLoadingTickers] = useState(false)
	useEffect(() => {
		let timerRequestToServer = null

		timerRequestToServer = setTimeout(async function requestToServer() {
			const [actualCoins, actualCoinsErr] = await getActualCoins()
			if (!actualCoinsErr) {
				const actualCoinsArr = Object.values(actualCoins.Data).map(
					coin => coin.Symbol
				)
				setThereIsCoins(actualCoinsArr)
				if (actualCoins) {
					setSwitchLoadingTickers(true)
				}
			}
			if (actualCoinsErr) {
				setTimeout(() => requestToServer, 5000)
			}
		}, 0)
		return () => clearTimeout(timerRequestToServer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<ValidateContext.Provider
				value={[thereIsCoins, setThereIsCoins, switchLoadingTickers]}
			>
				{children}
			</ValidateContext.Provider>
		</>
	)
}
