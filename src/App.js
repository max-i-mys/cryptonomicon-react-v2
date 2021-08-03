import "./App.css"
import Graph from "./components/Graph"
import Header from "./components/Header"
import Ticker from "./components/Ticker"
function App() {
	return (
		<div className="App">
			<div className="App container mx-auto flex flex-col items-center bg-gray-100 p-4">
				<div className="container">
					<Header />
					<hr className="w-full border-t border-gray-600 my-4" />
					<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
						<Ticker />
					</dl>
					<hr className="w-full border-t border-gray-600 my-4" />
					<Graph />
				</div>
			</div>
		</div>
	)
}

export default App
