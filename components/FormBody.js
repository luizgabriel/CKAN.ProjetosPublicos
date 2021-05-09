export default function FormBody({children}) {
	return (
		<div className="md:w-2/3 mx-auto">
			<div className="flex flex-wrap -m-2">
				{children}
			</div>
		</div>
	);
}