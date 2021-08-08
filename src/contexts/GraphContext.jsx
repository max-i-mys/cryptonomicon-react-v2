import { createContext, useReducer } from "react"
import { useTickers } from "../hooks/useTickers"

export const GraphContext = createContext()

export default function GraphProvider({ children }) {
	const [tickers] = useTickers()
	const [dataTicker, dispatchDataTicker] = useReducer(reducer, null)

	function reducer(state, action) {
		switch (action.type) {
			case "ADD_DATA_ACTIVE": {
				const activeIndex = tickers.findIndex(
					ticker => ticker.id === action.payload
				)
				if (activeIndex !== -1) {
					return tickers[activeIndex]
				}
				return null
			}
			case "DELETE_DATA_ACTIVE": {
				return action.payload
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<GraphContext.Provider value={[dataTicker, dispatchDataTicker]}>
				{children}
			</GraphContext.Provider>
		</>
	)
}
