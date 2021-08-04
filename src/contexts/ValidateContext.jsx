import { createContext, useEffect, useReducer, useState } from "react"
import { getActualCoins } from "../api/crud"

export const ValidateContext = createContext()
export default function ValidateProvider({ children }) {
	const [thereIsCoins, setThereIsCoins] = useState(null)
	useEffect(() => {
		;(async () => {
			const [actualCoins, actualCoinsErr] = await getActualCoins()
			if (!actualCoinsErr) {
				const actualCoinsArr = Object.values(actualCoins.Data).map(
					coin => coin.Symbol
				)
				setThereIsCoins(actualCoinsArr)
			}
		})()
	}, [])
	return (
		<>
			<ValidateContext.Provider value={[thereIsCoins, setThereIsCoins]}>
				{children}
			</ValidateContext.Provider>
		</>
	)
}
