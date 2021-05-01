export default function Button({children, textSize, color, rounded, disabled, className, ...rest}) {
	textSize = textSize || "md";
	rounded = rounded || "rounded";
	color = disabled ? "gray" : color;
	const bgColorValue = disabled ? 300 : 500;
	const bgHoverColorValue = disabled ? 400 : 600;
	const cursor = disabled ? "cursor-not-allowed" : "";

	return (
		<button disabled={disabled} {...rest}
			className={`flex text-white bg-${color}-${bgColorValue} border-0 py-2 px-2 items-center justify-center transition-all focus:outline-none hover:bg-${color}-${bgHoverColorValue} ${rounded} text-${textSize} ${cursor} ${className}`}>{children}</button>
	);
}