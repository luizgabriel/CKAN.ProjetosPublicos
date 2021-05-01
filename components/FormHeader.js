export default function FormHeader({ title, description }) {
    return (
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{title}</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{description}</p>
        </div>
    )
}
