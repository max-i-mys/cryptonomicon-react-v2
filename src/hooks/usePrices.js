import { useContext } from "react"
import { PricesContext } from "../contexts/PricesContext"

export default function usePrices() {
	return useContext(PricesContext)
}
