import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"
import ValidateProvider from "./contexts/ValidateContext"
import CurrenciesProvider from "./contexts/CurrenciesContext"
import GraphProvider from "./contexts/GraphContext"

ReactDOM.render(
	<React.StrictMode>
		<CurrenciesProvider>
			<TickersProvider>
				<GraphProvider>
					<ValidateProvider>
						<App />
					</ValidateProvider>
				</GraphProvider>
			</TickersProvider>
		</CurrenciesProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
