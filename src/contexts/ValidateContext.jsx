import { createContext, useEffect, useState } from "react"
import { getActualCoins } from "../api/crud"

export const ValidateContext = createContext()
export default function ValidateProvider({ children }) {
	const [thereIsCoins, setThereIsCoins] = useState("Error")
	const [loading, setLoading] = useState(true)
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
					setLoading(false)
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
					loading,
					connectErr,
				}}
			>
				{children}
			</ValidateContext.Provider>
		</>
	)
}
