import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"
import ValidateProvider from "./contexts/ValidateContext"
import CurrenciesProvider from "./contexts/CurrenciesContext"
import GraphProvider from "./contexts/GraphContext"
import PricesProvider from "./contexts/PricesContext"

ReactDOM.render(
	<React.StrictMode>
		<CurrenciesProvider>
			<TickersProvider>
				<PricesProvider>
					<GraphProvider>
						<ValidateProvider>
							<App />
						</ValidateProvider>
					</GraphProvider>
				</PricesProvider>
			</TickersProvider>
		</CurrenciesProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
