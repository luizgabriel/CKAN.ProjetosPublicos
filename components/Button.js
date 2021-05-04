export default function Button({children, textSize, color, rounded, disabled, className, light, ...rest}) {
	textSize = textSize || "md";
	rounded = rounded || "rounded";

	if (disabled) {
		color = "gray";
		light = true;
	}

	let bgColorValue = 500;
	if (light)
		bgColorValue -= 200;

	let bgHoverColorValue = 600;
	if (light)
		bgHoverColorValue -= 200;

	const cursor = disabled ? "cursor-not-allowed" : "";

	return (
		<button disabled={disabled} {...rest}
			className={`flex text-white bg-${color}-${bgColorValue} border-0 py-2 px-2 items-center justify-center transition-all focus:outline-none hover:bg-${color}-${bgHoverColorValue} ${rounded} text-${textSize} ${cursor} ${className}`}>{children}</button>
	);
}