import { useContext } from "react"
import { TickerContext } from "../contexts/TickersContext"

export function useTickers() {
	return useContext(TickerContext)
}
