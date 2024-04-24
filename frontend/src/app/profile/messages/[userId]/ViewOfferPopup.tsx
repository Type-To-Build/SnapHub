'use client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import { client, getDaysDifference, currencyFormatter } from "@/utils"
import Messages from "@/components/Messages/Messages"
import Link from "next/link"
import { useState, useCallback, useEffect } from 'react'
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
import StarRating from "./StarRating"

const MySwal = withReactContent(Swal)

const loginSchema = Yup.object().shape({
    ratingDescription: Yup.string().required('Enter rating and description')
})

export default function ViewOfferPopup({ freelancerData, groupId }: any) {
    const { data: session }: any = useSession()
    const router = useRouter()
    const [openPopup, setOpenPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [offerData, setOfferData] = useState<any>({})
    const [stars, setStars] = useState<number>(5)

    useEffect(() => {
        getOrder()
    }, [groupId])

    const getOrder = async () => {
        setUserLoading(true)
        await client(`/orders/groupId/${groupId}`, {}).then((res: any) => {
            setUserLoading(false)
            if (res && res.success) {
                setOfferData(res.data)

            }
        }).catch((err: any) => {
            setUserLoading(false)

        })
    }


    const onSubmit = async (data: any, setErrors: any) => {
        setLoading(true)
        let ordRes = await client(`/orders/complete`, {
            body: {
                ...data,
                stars,
                freelancer: freelancerData._id,
                _id: offerData._id
            }
        },session.user)
        setLoading(false)

        if (ordRes && ordRes.success) {
            MySwal.fire({
                title: "Success!",
                text: 'Order successfully complete.',
                icon: "success"
            })
            getOrder()
        } else {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: ordRes?.message || 'Something is wrong'
            });
        }
    };


    return <>
        <Popup title={'Offer Details'} open={openPopup} onSelect={() => setOpenPopup(false)}>

            {userLoading ? <Spinner /> : <div>
                <p className="mt-6"><span className="font-semibold ">Start Date : </span> {moment(offerData?.startDate).format("DD MMMM YYYY")}</p>
                <p><span className="font-semibold">To Date : </span> {moment(offerData?.toDate).format("DD MMMM YYYY")}</p>
                <p><span className="font-semibold">Price : </span> {currencyFormatter.format(offerData.amount)}</p>
                <p><span className="font-semibold">Order Status : </span> {offerData.orderStatus}</p>

                {offerData.orderStatus == 'running' && <Formik
                    initialValues={{
                        ratingDescription: ''
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setErrors, resetForm }) => {
                        onSubmit(values, setErrors)
                    }}
                >
                    {({ values }) => {


                        return (<Form className="py-6 text-left space-y-6 border-t mt-6">
                            <p className="font-semibold">Complete this Offer</p>
                            <StarRating onChange={setStars} />
                            <InputField name="ratingDescription" type="textarea" label="Description" />
                            <Button loading={loading} type='submit'>Submit</Button>

                        </Form>)
                    }}
                </Formik>}

            </div>}
        </Popup>
        <button className="bg-blue-500 rounded-md py-2 px-6 text-white text-sm " onClick={() => setOpenPopup(true)}>View Offer</button>
    </>
}