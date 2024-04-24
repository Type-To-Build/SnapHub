'use client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import { client, getDaysDifference,currencyFormatter } from "@/utils"
import Messages from "@/components/Messages/Messages"
import Link from "next/link"
import { useState, useCallback ,useEffect} from 'react'
import Popup from "@/components/Popups/Popup"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '@/components/Fields/CustomFields'
import Button from '@/components/Buttons/Button';
import useRazorpay from "react-razorpay";
import { useSession } from 'next-auth/react';
import moment from "moment"
import Spinner from "@/components/Loading/Spinner";
import { useRouter } from 'next/navigation'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const loginSchema = Yup.object().shape({
    startDate: Yup.string().required('Select from date'),
    toDate: Yup.string().required('Select to date')
})

export default function CreateOfferPopup({ userId,groupId }: any) {
    const { data: session }: any = useSession()
    const router = useRouter()
    const [openPopup, setOpenPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [userData, setUserData] = useState<any>({})
    const [Razorpay, isLoaded] = useRazorpay();
   useEffect(()=>{
    getUser()
   },[userId])
    const getUser = async () =>{
        setUserLoading(true)
        await client(`/users/${userId}`,{}).then((res:any) => {
            setUserLoading(false)
            if(res && res.success){
                setUserData(res.data)

            }
        }).catch((err:any)=>{
            setUserLoading(false)

        })
    }
    const handlePayment = useCallback(async (dataValues: any) => {
        try {
            setLoading(true)
            let totalPrice = getDaysDifference(dataValues.startDate,dataValues.toDate) * (userData?.price || 50)
            const options: any = {
                key: "rzp_test_0w2ZmCHslUrckh",
                // key: "rzp_live_YvlHLLnSXlqtRB",
                amount: (totalPrice * 100).toString(),
                currency: 'GBP',
                name: "SnapHub",
                description: "SnapHub",
                image: "https://snap-seven-jade.vercel.app/img/snaphub-logo.png",
                modal: {
                    ondismiss: function () {
                        setLoading(false)
                    }
                },
                handler: async (res: any) => {

                    let body = {
                        ...dataValues,
                        groupId,
                        freelancer: userData._id,
                        amount: totalPrice,
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_signature: res.razorpay_signature,
                        paymentStatus: 1
                    }
                    let response = await client('/orders/create', { body }, session.user)

                    setLoading(false)

                    if (response && response.success) {
                        MySwal.fire({
                            title: "Success!",
                            text: 'Photographer successfully hired.',
                            icon: "success"
                          })
                        setOpenPopup(false)
                        router.refresh()
                    }
                },
                prefill: {
                    name: session.user.fullName,
                    email: session.user.email,
                    contact: session?.user?.phone || '',
                },
                theme: {
                    color: "#02008B",
                },
            };
            const rzpay = new Razorpay(options);
            rzpay.open();
            rzpay.on("payment.failed", function (response: any) {
                console.log(response, '--response');
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response?.error?.description || ''
                  }); 

            });
        } catch (error) {
            setLoading(false)
        }

    }, [Razorpay, isLoaded]);


    const onSubmit = async (data: any, setErrors: any) => {
        handlePayment(data)
    };

    return <>
        <Popup title={'Create Offer'} open={openPopup} onSelect={() => setOpenPopup(false)}>

            {userLoading ? <Spinner /> : <Formik
                initialValues={{
                    startDate: moment().format('YYYY-MM-DD'),
                    toDate: moment().add(1,'days').format('YYYY-MM-DD'),
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setErrors, resetForm }) => {
                    onSubmit(values, setErrors)
                }}
            >
                {({ values }) => {
      
                    let days  = getDaysDifference(values.startDate,values.toDate)

                return (<Form className="py-8 text-left space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField name="startDate" type="date" label="Start date" />
                        <InputField name="toDate" type="date" label="To date" />
                    </div>

                
                    <Button loading={loading} type='submit'>
                    Pay Now  -  {userData?.price || 50} X {days} : <span className="font-semibold">{currencyFormatter.format(getDaysDifference(values.startDate,values.toDate) * (userData?.price || 50))}</span>
                    </Button>

                </Form>)}}
            </Formik>}
        </Popup>
        <button className="bg-blue-500 rounded-md py-2 px-6 text-white text-sm " onClick={() => setOpenPopup(true)}>Create Offer</button>
    </>
}