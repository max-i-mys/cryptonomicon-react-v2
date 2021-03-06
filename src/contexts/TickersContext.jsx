import { useRef, useEffect, createContext, useReducer, useState } from "react"
import { getPrices } from "../api/crud"
import { useCurrencies } from "../hooks/useCurrencies"
import { roundTheNumber } from "../utils/functions"

export const TickerContext = createContext()
const initialState = []

export default function TickersProvider({ children }) {
	const ref = useRef()
	const [currencies] = useCurrencies()
	const [activeIndex, setActiveIndex] = useState(null)
	const [tickers, dispatchTickers] = useReducer(reducer, initialState)

	useEffect(() => {
		if (!localStorage.getItem("saveTickers")) {
			localStorage.setItem("saveTickers", JSON.stringify([]))
		} else {
			const saveTickers = JSON.parse(localStorage.getItem("saveTickers", tickers))
			dispatchTickers({
				type: "INITIAL_TICKERS",
				payload: saveTickers,
			})
			saveTickers.forEach((tickers, index) => tickers.active && setActiveIndex(index))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let timerRequestToServer = null
		timerRequestToServer = setTimeout(() => ref.current(), 0)
		return () => clearTimeout(timerRequestToServer)
	}, [])

	useEffect(() => {
		changePrices()
		ref.current = async () => {
			await changePrices()
			setTimeout(() => ref.current(), 5000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencies])

	async function changePrices() {
		if (currencies.length > 0) {
			const currencyString = currencies.join(",")
			const [pricesData, pricesDataErr] = await getPrices(currencyString)
			if (!pricesDataErr) {
				for (let key in pricesData) {
					pricesData[key].USD = roundTheNumber(pricesData[key]?.USD)
				}
				dispatchTickers({ type: "PRICE_TICKER", payload: pricesData })
			}
		}
	}

	function reducer(state, action) {
		switch (action.type) {
			case "INITIAL_TICKERS":
				return action.payload
			case "ADD_TICKER":
				localStorage.setItem(
					"saveTickers",
					JSON.stringify([...state, action.payload])
				)
				return [...state, action.payload]
			case "DELETE_TICKER": {
				const newState = [...state]
				const idx = state.findIndex(ticker => ticker.id === action.payload)
				if (idx !== -1) {
					newState.splice(idx, 1)
				}
				localStorage.setItem("saveTickers", JSON.stringify([...newState]))
				return newState
			}
			case "ADD_ACTIVE_TICKER": {
				const newState = [...state]
				newState.forEach((ticker, index) => {
					if (ticker.id === action.payload.id) {
						ticker.active = true
						setActiveIndex(index)
					} else {
						ticker.active = false
					}
				})
				localStorage.setItem("saveTickers", JSON.stringify([...newState]))
				return newState
			}
			case "DISABLE_ACTIVE_TICKER": {
				const newState = [...state]
				if (newState[activeIndex]) {
					newState[activeIndex].active = false
					setActiveIndex(null)
					localStorage.setItem("saveTickers", JSON.stringify([...newState]))
				}
				return newState
			}
			case "PRICE_TICKER": {
				const newState = [...state]
				newState.forEach(ticker => {
					if (action.payload[ticker.currency]?.USD) {
						ticker.price = action.payload[ticker.currency]?.USD
					}
					if (ticker.active === true) {
						ticker.switchPrice = !ticker.switchPrice
					}
				})
				return newState
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<TickerContext.Provider value={{ tickers, dispatchTickers, activeIndex }}>
				{children}
			</TickerContext.Provider>
		</>
	)
}
