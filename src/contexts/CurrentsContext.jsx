import { createContext, useReducer } from "react"

export const CurrentsContext = createContext()
const initialState = []
export default function CurrentsProvider({ children }) {
	const [currents, dispatchCurrents] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "ADD_CURRENT": {
				let addedCurrents = [...state]
				const isThereCurrent = addedCurrents.find(
					current => current === action.payload
				)
				if (!isThereCurrent) {
					addedCurrents = [...state, action.payload]
					return addedCurrents
				}
				return addedCurrents
			}
			case "DELETE_CURRENT": {
				let addedCurrents = [...state]
				const currentIndex = addedCurrents.findIndex(
					current => current === action.payload
				)
				if (typeof currentIndex === "number") {
					addedCurrents.splice(currentIndex, 1)
					return addedCurrents
				}
				return addedCurrents
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<CurrentsContext.Provider value={[currents, dispatchCurrents]}>
				{children}
			</CurrentsContext.Provider>
		</>
	)
}
