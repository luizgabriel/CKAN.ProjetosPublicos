import SearchIcon from "./SearchIcon";

export default function Header() {
	return (
		<div className="text-gray-600 body-font relative" style={{backgroundColor: "#13326b", backgroundImage: "url(/bg.png)", height: 115}}>
			<div className="container px-5 py-10 mx-auto flex flex-row mx-10">
				<div className="mt-5 mb-5">
					<img src="/fgv-data.png" alt="Dataurbe" className="h-7"/>
				</div>
				<div className="flex flex-row mt-5 mb-5 text-lg ml-auto">
					<a className="text-white mr-2" href="https://dataurbe.appcivico.com/dataset">Conjunto de dados</a>
					<span className="text-white mr-2">|</span>
					<a className="text-white" href="https://dataurbe.appcivico.com/organization">Cidades</a>
					<form method="get" action="https://dataurbe.appcivico.com/dataset" className="relative">
						<input className="bg-white px-2 py-0 text-sm border rounded ml-2" name="q" placeholder="Pesquisar"/>
						<button type="submit" className="absolute right-1 top-2">
							<SearchIcon size="4"/>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}