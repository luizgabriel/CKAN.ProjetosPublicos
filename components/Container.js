export default function Container({children}) {
	return (
		<section className="text-gray-600 body-font relative" style={{backgroundColor: "#eeeeee", backgroundImage: "url(/bg.png)"}}>
			<div className="container px-5 py-10 mx-auto">
				{children}
			</div>
		</section>
	);
}
