export function ModalBody({children}) {
	return (
		<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div className="sm:flex sm:items-start">
				{children}
			</div>
		</div>
	);
}

export function ModalBodyIcon({children, iconColor, IconComponent}) {
	return (
		<ModalBody>
			<div
				className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
				<IconComponent size="6" className={`text-${iconColor}`}/>
			</div>
			<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
				{children}
			</div>
		</ModalBody>
	);
}

export function ModalFooter({children}) {
	return (
		<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
			{children}
		</div>
	);
}

export default function Modal({children}) {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
		     aria-modal="true">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<div
					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					{children}
				</div>
			</div>
		</div>
	);
}