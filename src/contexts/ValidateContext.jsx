import { createContext, useEffect, useState } from "react"
import { getActualCoins } from "../api/crud"

export const ValidateContext = createContext()
export default function ValidateProvider({ children }) {
	const [allCoins, setAllCoins] = useState("Error")
	const [loading, setLoading] = useState(true)
	const [countErr, setCountErr] = useState(0)
	useEffect(() => {
		let timerRequestToServer = null

		timerRequestToServer = setTimeout(async function requestToServer() {
			const [actualCoins, actualCoinsErr] = await getActualCoins()
			if (!actualCoinsErr) {
				const actualCoinsArr = Object.values(actualCoins.Data).map(
					coin => coin.Symbol
				)
				const coinsArr = Object.values(actualCoins.Data).map(
						coin => coin = {
							name: coin.Symbol.toUpperCase(),
							fullName: coin.CoinName.toUpperCase()
						}
				)
				// const el = coinsArr.find(coin => "CHIA" === coin.fullName || "CHIA" === coin.name)
				// console.log(el.name)
				setAllCoins(coinsArr)
				setCountErr(0)
				if (actualCoins) {
					setLoading(false)
				}
			}
			if (actualCoinsErr) {
				setTimeout(() => requestToServer(), 5000)
				setCountErr(prev => prev + 1)
			}
		}, 0)
		return () => clearTimeout(timerRequestToServer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<ValidateContext.Provider
				value={{
					allCoins,
					setAllCoins,
					loading,
					countErr,
				}}
			>
				{children}
			</ValidateContext.Provider>
		</>
	)
}
