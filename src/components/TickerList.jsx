import { useTickers } from "../hooks/useTickers"
import Ticker from "./Ticker"

export default function TickerList() {
	const [tickers] = useTickers()
	return (
		<>
			{tickers &&
				tickers.map(ticker => <Ticker key={ticker.id} tickerData={ticker} />)}
		</>
	)
}
