import { useState, useEffect } from "react"
import { normalizePrice } from "../utils/functions"

export default function GraphBars({ dataTicker }) {
	const [currentPrices, setCurrentPrices] = useState([])
	useEffect(() => {
		if (dataTicker.price !== "unknown") {
			setCurrentPrices(() => [...currentPrices, dataTicker.price])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataTicker.switchPrice])
	useEffect(() => {
		setCurrentPrices([])
	}, [dataTicker.currency])
	return (
		<>
			{normalizePrice(currentPrices).length > 0 &&
				normalizePrice(currentPrices).map((bar, index) => {
					return (
						<div
							key={index}
							style={{ height: bar + "%" }}
							className="bg-purple-800 border w-10 h-40"
						></div>
					)
				})}
		</>
	)
}
