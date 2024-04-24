'use client'
import Link from 'next/link'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { signIn } from "next-auth/react"
import { useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Fields/CustomFields'
import { useSession } from 'next-auth/react';
import { client } from '@/utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const loginSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    shortDescription: Yup.string().required('Short description is required'),
    description: Yup.string().required('Description is required'),
})

export default function EditProfile() {
  const { data: session }: any = useSession()
    
    const router = useRouter()
    const [loading, setLoading] = useState(false)
 
    const onSubmit = async (body: any, setErrors: any) => {
        setLoading(true)
        try {
            const result: any = await client(`/users/${session.user._id}/update`, {body},session.user);

            if (result && result.success) {
                MySwal.fire({
                    title: "Success!",
                    text: result?.message || '',
                    icon: "success"
                })

            } else {
                MySwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result?.message || '',
                  });

            }
        } catch (error) {
            console.log(error)
        }


        setLoading(false)
    };

    return (
        <main>
            <section className="py-8">
                <div className="container mx-auto">
                    <div className="text-center md:w-1/2 mx-auto">
                  
                        <h3 className="w-fit mx-auto font-semibold text-5xl my-8 border-b-4 pb-5 border-black">Edit Profile</h3>
                        <Formik
                            initialValues={{
                                fullName: session.user.fullName,
                                shortDescription: session.user.shortDescription,
                                description: session.user.description,
                            }}
                            validationSchema={loginSchema}
                            onSubmit={(values, { setErrors, resetForm }) => {
                                onSubmit(values, setErrors)
                            }}
                        >
                            <Form className="py-8 text-left">
                                <InputField name="fullName" label="Full name" />
                                <InputField name="shortDescription" type="textarea" label="Short description" />
                                <InputField name="description" type="textarea" label="Description" />
                                <Button loading={loading} type='submit'>Update</Button>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    );
}
