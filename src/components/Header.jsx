import { useRef, useState } from "react"
import { useCurrencies } from "../hooks/useCurrencies"
import { useTickers } from "../hooks/useTickers"
import { useValidate } from "../hooks/useValidate"
import SearchHint from "./SearchHint"

export default function Header() {
	const [, dispatchCurrencies] = useCurrencies()
	const [currentValue, setCurrentValue] = useState("")
	const [showMesDoubleTick, setShowMesDoubleTick] = useState(false)
	const [showMesNotTick, setShowMesNotTick] = useState(false)
	const { tickers, dispatchTickers } = useTickers()
	const { allCoins } = useValidate()
	const fieldInput = useRef()

	async function handlerAdd(value) {
		const correctCurrentValue = value || currentValue
		const tickerEl = allCoins.find(
			coin =>
				correctCurrentValue === coin.fullName ||
				correctCurrentValue === coin.name
		)
		const getCurrency = tickerEl?.name
		const isTicker = tickers.find(ticker => ticker.currency === getCurrency)
		if (isTicker) {
			setShowMesDoubleTick(true)
			fieldInput.current.focus()
			return
		}
		const id =
			tickers.length > 0 ? Math.max(...tickers.map(ticker => ticker.id)) : 0

		const newTicker = {
			currency: getCurrency,
			id: id + 1,
			price: "-",
			active: false,
			switchPrice: false,
		}
		if (newTicker.currency && !isTicker && getCurrency) {
			dispatchTickers({ type: "ADD_TICKER", payload: newTicker })
			dispatchCurrencies({ type: "ADD_CURRENCY", payload: getCurrency })
			fieldInput.current.value = ""
			setCurrentValue("")
			return
		}
		setShowMesNotTick(true)
		fieldInput.current.focus()
	}
	function handlerKey(e) {
		if (e.key === "Enter" && currentValue) {
			return handlerAdd()
		}
		if (e.key !== "Enter") {
			showMesDoubleTick && setShowMesDoubleTick(false)
			setShowMesNotTick && setShowMesNotTick(false)
		}
	}
	function handlerAddSearchHint(currentHint) {
		fieldInput.current.value = currentHint
		handlerAdd(currentHint)
	}
	return (
		<>
			<section>
				<div className="flex">
					<div className="max-w-xs">
						<label
							htmlFor="wallet"
							className="block text-sm font-medium text-gray-700"
						>
							Тикер
						</label>
						<div className="mt-1 relative rounded-md shadow-md">
							<input
								onChange={e =>
									setCurrentValue(() =>
										e.target.value.toUpperCase().replace(/\s+/g, "")
									)
								}
								onKeyDown={handlerKey}
								type="text"
								name="wallet"
								id="wallet"
								className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
								placeholder="Например DOGE"
								autoComplete="off"
								ref={fieldInput}
							/>
						</div>
						<SearchHint
							current={currentValue.toUpperCase()}
							addHint={handlerAddSearchHint}
						/>
						{showMesDoubleTick && (
							<div className="text-sm text-red-600">
								Такой тикер уже добавлен
							</div>
						)}
						{showMesNotTick && (
							<div className="text-sm text-red-600">
								Невозможно обработать тикер
							</div>
						)}
					</div>
				</div>
				<button
					onClick={() => (currentValue ? handlerAdd() : "")}
					type="button"
					className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					<svg
						className="-ml-0.5 mr-2 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="#ffffff"
					>
						<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</svg>
					Добавить
				</button>
			</section>
		</>
	)
}
