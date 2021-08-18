import { useValidate } from "../hooks/useValidate"
import { useEffect, useState } from "react"

export default function SearchHint({ current }) {
	const { allCoins } = useValidate()
	const [filteredCoins, setFilteredCoins] = useState([])
	useEffect(() => {
		if (current) {
			const filteredArr = [...allCoins]
				.filter(
					coin => coin.name.includes(current) || coin.fullName.includes(current)
				)
				.sort(
					coin =>
						(coin.name === current) * -1 || (coin.fullName === current) * -1
				)
			filteredArr.length = 4
			setFilteredCoins(filteredArr)
			return
		}
		if (!current) {
			setFilteredCoins([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current])

	return (
		<>
			{filteredCoins.length > 0 && (
				<div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
					{filteredCoins.map((coin, index) => {
						return (
							<span
								key={index}
								className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
							>
								{coin.name}
							</span>
						)
					})}
				</div>
			)}
		</>
	)
}

// const filteredArr = [...allCoins]
// 		.filter(coin => {
// 			const searchName = coin.name.split(current).join("")
// 			const searchFullName = coin.fullName.split(current).join("")
// 			if (
// 					coin.name.length !== searchName.length ||
// 					coin.fullName.length !== searchFullName.length
// 			) {
// 				return coin
// 			}
// 		})
