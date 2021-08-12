import { useCurrencies } from "../hooks/useCurrencies"
import useGraph from "../hooks/useGraph"
import { useTickers } from "../hooks/useTickers"

export default function Ticker({ tickerData }) {
	const [, dispatchTickers] = useTickers()
	const [, dispatchCurrencies] = useCurrencies()
	const [activeTicker, dispatchActiveDataTicker] = useGraph()
	function handlerDelete(e) {
		e.stopPropagation()
		if (tickerData.id) {
			dispatchTickers({ type: "DELETE_TICKER", payload: tickerData.id })
			if (tickerData.id === activeTicker.id) {
				dispatchActiveDataTicker({ type: "DELETE_DATA_ACTIVE", payload: null })
			}
			dispatchCurrencies({
				type: "DELETE_CURRENCY",
				payload: tickerData.currency,
			})
		}
	}
	function handlerActive(e) {
		if (tickerData.id) {
			dispatchTickers({ type: "ACTIVE_TICKER", payload: tickerData })
			dispatchActiveDataTicker({
				type: "ADD_DATA_ACTIVE",
				payload: tickerData.id,
			})
		}
	}
	return (
		<>
			<div
				onClick={handlerActive}
				className={`bg-white border-4 overflow-hidden shadow rounded-lg  border-solid cursor-pointer ${
					tickerData.active ? "border-purple-800" : " border-opacity-0"
				}`}
			>
				<div className="px-4 py-5 sm:p-6 text-center">
					<dt className="text-sm font-medium text-gray-500 truncate">
						{tickerData.currency} - USD
					</dt>
					<dd className="mt-1 text-3xl font-semibold text-gray-900">
						{tickerData.price}
					</dd>
				</div>
				<div className="w-full border-t border-gray-200"></div>
				<button
					onClick={handlerDelete}
					className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
				>
					<svg
						className="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="#718096"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
					Удалить
				</button>
			</div>
		</>
	)
}
