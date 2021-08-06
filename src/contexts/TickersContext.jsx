import { createContext, useReducer } from "react"

export const TickerContext = createContext()
const initialState = []

export default function TickersProvider({ children }) {
	const [tickers, dispatchTickers] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "ADD":
				return [...state, action.payload]
			case "DELETE": {
				const newState = [...state]
				const idx = state.findIndex(ticker => ticker.id === action.payload)
				if (idx !== -1) {
					newState.splice(idx, 1)
				}
				return newState
			}
			case "ACTIVE": {
				const newState = [...state]
				newState.forEach(ticker =>
					ticker.id === action.payload.id
						? (ticker.active = true)
						: (ticker.active = false)
				)
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
