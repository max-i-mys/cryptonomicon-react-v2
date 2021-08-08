import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import TickersProvider from "./contexts/TickersContext"
import ValidateProvider from "./contexts/ValidateContext"
import CurrentsProvider from "./contexts/CurrentsContext"
import GraphProvider from "./contexts/GraphContext"

ReactDOM.render(
	<React.StrictMode>
		<CurrentsProvider>
			<TickersProvider>
				<GraphProvider>
					<ValidateProvider>
						<App />
					</ValidateProvider>
				</GraphProvider>
			</TickersProvider>
		</CurrentsProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
