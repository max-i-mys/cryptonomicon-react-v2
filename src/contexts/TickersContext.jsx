import { createContext, useReducer } from "react"

export const TickerContext = createContext()
const initialState = []

export default function TickersProvider({ children }) {
	const [tickers, dispatchTickers] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "ADD_TICKER":
				return [...state, action.payload]
			case "DELETE_TICKER": {
				const newState = [...state]
				const idx = state.findIndex(ticker => ticker.id === action.payload)
				if (idx !== -1) {
					newState.splice(idx, 1)
				}
				return newState
			}
			case "ACTIVE_TICKER": {
				const newState = [...state]
				newState.forEach(ticker =>
					ticker.id === action.payload.id
						? (ticker.active = true)
						: (ticker.active = false)
				)
				return newState
			}
			case "PRICE_TICKER": {
				const newState = [...state]
				newState.forEach(ticker => {
					if (action.payload[ticker.currency]?.USD) {
						ticker.price = action.payload[ticker.currency]?.USD
					}
					if (ticker.active === true) {
						ticker.switchPrice = !ticker.switchPrice
					}
				})
				return newState
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<TickerContext.Provider value={[tickers, dispatchTickers]}>
				{children}
			</TickerContext.Provider>
		</>
	)
}
