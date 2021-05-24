import React from "react";

export default function ProgressBar({value, rounded, className}) {
	rounded = rounded || "rounded";

	return (
		<div className={`overflow-hidden h-2 text-xs flex ${rounded} bg-gray-200 ${className}`}>
			<div style={{width: `${value * 100}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all"/>
		</div>
	);
}