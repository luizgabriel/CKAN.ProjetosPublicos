export default function InputError({error}) {
	return (
		<>
			{error ? (<div className="text-xs text-red-700 mt-1">{error}</div>) : null}
		</>
	);
}