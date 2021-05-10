export default function Box({children}) {
	return (
		<div className="bg-white rounded p-4 py-20" style={{boxShadow: "0 0 0 4px rgb(0 0 0 / 5%)"}}>
			{children}
		</div>
	);
}