import { useContext } from "react"
import { GraphContext } from "../contexts/GraphContext"

export default function useGraph() {
	return useContext(GraphContext)
}
