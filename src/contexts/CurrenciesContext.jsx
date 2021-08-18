import { createContext, useEffect, useReducer } from "react"

export const CurrenciesContext = createContext()
const initialState = []
export default function CurrenciesProvider({ children }) {
	const [currencies, dispatchCurrencies] = useReducer(reducer, initialState)
	useEffect(() => {
		if (localStorage.getItem("saveTickers")) {
			const dataLocalStorage = JSON.parse(localStorage.getItem("saveTickers"))
			const currencyList = dataLocalStorage.map(coin => coin.currency)
			dispatchCurrencies({ type: "INITIAL_CURRENCY", payload: currencyList })
		}
	}, [])

	function reducer(state, action) {
		switch (action.type) {
			case "INITIAL_CURRENCY": {
				return action.payload
			}
			case "ADD_CURRENCY": {
				let addedCurrencies = [...state]
				const isThereCurrency = addedCurrencies.find(
					currency => currency === action.payload
				)
				if (!isThereCurrency) {
					addedCurrencies = [...state, action.payload]
					return addedCurrencies
				}
				return addedCurrencies
			}
			case "DELETE_CURRENCY": {
				let addedCurrencies = [...state]
				const currencyIndex = addedCurrencies.findIndex(
					currency => currency === action.payload
				)
				if (typeof currencyIndex === "number") {
					addedCurrencies.splice(currencyIndex, 1)
					return addedCurrencies
				}
				return addedCurrencies
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<CurrenciesContext.Provider value={[currencies, dispatchCurrencies]}>
				{children}
			</CurrenciesContext.Provider>
		</>
	)
}
