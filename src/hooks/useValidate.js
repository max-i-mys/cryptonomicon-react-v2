import { useContext } from "react"
import { ValidateContext } from "../contexts/ValidateContext"

export function useValidate() {
	return useContext(ValidateContext)
}
