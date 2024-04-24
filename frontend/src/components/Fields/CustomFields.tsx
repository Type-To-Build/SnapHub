'use client'
import { ErrorMessage, Field } from 'formik'
import PasswordFieldWraper from './PasswordFields';
import moment from 'moment';

const CustomFields = ({ label = '', name = '', type = 'input', children,value="",bgColor="bg-transparent",placeholder="",options=[]  }: any) => {
    switch (type) {
        case 'number':
            return (
                <div className="mb-2">
                    {label.length != 0 && <label htmlFor={name} className="block text-sm font-medium leading-6 ">{label}</label>}
                    <Field className={`${bgColor} block w-full rounded-md border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6`} id={name} name={name} type={type} placeholder={placeholder} >{children}</Field>
                    <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />
                </div>

            )
        break;
        case 'date':
            return (
                <div className="mb-2">
                    {label.length != 0 && <label htmlFor={name} className="block text-sm font-medium leading-6 ">{label}</label>}
                    <Field className={`${bgColor} block w-full rounded-md border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6`} id={name} name={name} type={"date"}  min={moment().format("Y-m-d")} placeholder={placeholder} >{children}</Field>
                    <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />
                </div>

            )
        break;
        case 'checkbox':
            return (<div className="mb-2">
                <div className="flex items-center">
                    
                    <Field type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id={label.replaceAll(' ','')} name={name} value={value}  />
                    <label htmlFor={label.replaceAll(' ','')} className="ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                       
                        {label}
                    </label>
                </div>
                <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />

                </div>)
            break;

        case 'radio':
            return (<div className="mb-2">
                {options?.map((item:any,i:number) =>  <div key={i} className="flex items-center mb-2">
                    <Field type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id={name+item.label.replaceAll(' ','')} name={name} value={item.value}  />
                    <label htmlFor={name+item.label.replaceAll(' ','')} className="ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        {item.label}
                    </label>
                </div>)}
               
                <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />

                </div>)
            break;
            case 'password':
                return (<div className="mb-4">
                    {label.length != 0 && <label htmlFor={name} className="block text-sm font-medium leading-6 ">{label}</label>}

                    <PasswordFieldWraper />
                   
                    <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />
    
                    </div>)
                break;
        default:
            return (
                <div className=" mb-4">
                    {label.length != 0 && <label htmlFor={name} className="block text-sm font-medium leading-6 ">{label}</label>}
                    <Field className={`${bgColor} px-4 py-3 border-2 border-black w-full`} id={name} name={name} as={type} placeholder={placeholder}>{children}</Field>
                    <ErrorMessage component='span' className={'text-xs text-red-600'} name={name} />
                </div>

            )
            break;
    }

}
export default CustomFields