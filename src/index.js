import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"

ReactDOM.render(
	<React.StrictMode>
		<TickersProvider>
			<App />
		</TickersProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
