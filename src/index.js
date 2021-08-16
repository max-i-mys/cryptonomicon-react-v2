import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"
import ValidateProvider from "./contexts/ValidateContext"
import CurrenciesProvider from "./contexts/CurrenciesContext"

ReactDOM.render(
	<React.StrictMode>
		<CurrenciesProvider>
			<TickersProvider>
				<ValidateProvider>
					<App />
				</ValidateProvider>
			</TickersProvider>
		</CurrenciesProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
