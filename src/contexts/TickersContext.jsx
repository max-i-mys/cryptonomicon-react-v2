import { createContext, useReducer } from "react"

export const TickerContext = createContext()
const initialState = []

export default function TickersProvider({ children }) {
	const [state, dispatchState] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "ADD":
				return [...state, action.payload]
			case "DELETE": {
				return
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<TickerContext.Provider value={[state, dispatchState]}>
				{children}
			</TickerContext.Provider>
		</>
	)
}
