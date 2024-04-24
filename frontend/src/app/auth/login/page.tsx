'use client'
import Link from 'next/link'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { signIn } from "next-auth/react"
import { useState } from 'react';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Fields/CustomFields'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email').required('Please enter a email'),
  password: Yup.string().required('Please enter password').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
 
  const onSubmit = async (data: any, setErrors: any) => {
    setLoading(true)
    try {
      const result: any = await signIn('credentials', {
        ...data,
        redirect: false, // Set redirect to false to prevent automatic redirection
      });

      if (result.error) {
        setErrors({ password: 'Sign in failed. Check the details you provided are correct.' });
      } else {
        // Login was successful, handle accordingly (e.g., show success message)
        router.push('/profile')
        console.log(result, 'Login successful');
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
          <div className="text-center md:w-1/3 mx-auto">

            <h3 className="w-fit mx-auto font-semibold text-5xl my-8 border-b-4 pb-5 border-black">Welcome Back</h3>
            <a href="/register" className="bg-black py-3 px-6 text-white w-full font-medium block">SignUp</a>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={(values, { setErrors, resetForm }) => {
                onSubmit(values, setErrors)
              }}
            >
              <Form className="py-8 text-left">
                <InputField name="email" label="Email" />
                <InputField name="password" label="Password" type="password" />
                <Button loading={loading} type='submit'>Login</Button>

              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </main>
  );
}
