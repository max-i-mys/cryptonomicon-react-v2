import { useContext } from "react"
import { CurrentsContext } from "../contexts/CurrentsContext"

export function useCurrents() {
	return useContext(CurrentsContext)
}
