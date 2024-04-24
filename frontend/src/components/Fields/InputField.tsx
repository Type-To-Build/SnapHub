'use client'
import { ErrorMessage, Field } from 'formik'

const InputField = ({ label = '', name = '',type='input',placeholder='',bg=''}: any) => {
    return (
        <div className="mb-2">
            {label.length != 0 && <label htmlFor={name} className="block text-sm font-medium leading-6 ">{label}</label>}
            <Field placeholder={placeholder} className={`  block w-full rounded-md border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 ${bg} `} id={name} name={name} as={type} />
            <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />
        </div>

    )
}
export default InputField