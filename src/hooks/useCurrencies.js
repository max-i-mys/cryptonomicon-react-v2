import { useContext } from "react"
import { CurrenciesContext } from "../contexts/CurrenciesContext"

export function useCurrencies() {
	return useContext(CurrenciesContext)
}
