import { createContext, useEffect, useState } from "react"
import { getActualCoins } from "../api/crud"

export const ValidateContext = createContext()
export default function ValidateProvider({ children }) {
	const [thereIsCoins, setThereIsCoins] = useState("Error")
	const [switchLoadingTickers, setSwitchLoadingTickers] = useState(false)
	const [connectErr, setConnectErr] = useState(0)
	useEffect(() => {
		let timerRequestToServer = null

		timerRequestToServer = setTimeout(async function requestToServer() {
			const [actualCoins, actualCoinsErr] = await getActualCoins()
			if (!actualCoinsErr) {
				const actualCoinsArr = Object.values(actualCoins.Data).map(
					coin => coin.Symbol
				)
				setThereIsCoins(actualCoinsArr)
				setConnectErr(0)
				if (actualCoins) {
					setSwitchLoadingTickers(true)
				}
			}
			if (actualCoinsErr) {
				setTimeout(() => requestToServer(), 5000)
				setConnectErr(prev => prev + 1)
			}
		}, 0)
		return () => clearTimeout(timerRequestToServer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<ValidateContext.Provider
				value={{
					thereIsCoins,
					setThereIsCoins,
					switchLoadingTickers,
					connectErr,
				}}
			>
				{children}
			</ValidateContext.Provider>
		</>
	)
}
