
interface IButton {
    children?: any,
    type?: "button" | "submit" | "reset",
    loading?: boolean,
    width?: string,
    onClick?: any,
    id?: string
}
export default function Button({ children, type = "button", loading = false, width = 'w-full',onClick,id="" }: IButton) {
    return (<button id={id} disabled={loading} type={type} onClick={onClick} className={`bg-blue-500 py-3 px-6 text-white w-full font-medium flex justify-center items-center ${width}`}>
        {loading && <svg className="animate-spin  mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
        {children}</button>)
}