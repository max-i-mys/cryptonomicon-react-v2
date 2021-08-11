import { createContext, useReducer } from "react"

export const CurrenciesContext = createContext()
const initialState = []
export default function CurrenciesProvider({ children }) {
	const [currencies, dispatchCurrencies] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
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
