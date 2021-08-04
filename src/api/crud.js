import axios from "axios"
import { BASE_URL } from "./consants"

const crud = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-type": "application/json; charset=UTF-8" },
})

crud.interceptors.response.use(
	response => {
		if (response.data.Response === "Error") {
			return [null, response.data]
		}
		return [response.data, null]
	},
	error => {
		return [null, error]
	}
)

export function getActualCoins() {
	return crud.get("/all/coinlist")
}
