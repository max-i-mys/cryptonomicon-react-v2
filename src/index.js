import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"
import ValidateProvider from "./contexts/ValidateContext"

ReactDOM.render(
	<React.StrictMode>
		<TickersProvider>
			<ValidateProvider>
				<App />
			</ValidateProvider>
		</TickersProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
