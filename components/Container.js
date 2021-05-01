export default function Container({children}) {
	return (
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				{children}
			</div>
		</section>
	);
}
