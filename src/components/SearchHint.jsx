import {useValidate} from "../hooks/useValidate";
import {useEffect} from "react";

export default function SearchHint({current}) {
	const { allCoins } = useValidate()
	// useEffect(()=>{
	// 	console.log(allCoins)
	// },[allCoins])
	return (
			<>
				<div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
						<span

							className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
						>
							{current}
						</span
							>
				</div>
			</>
	)
}