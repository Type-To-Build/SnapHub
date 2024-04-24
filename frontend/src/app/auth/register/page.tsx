'use client'
import Image from "next/image";
import InputField from '@/components/Fields/CustomFields'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/Buttons/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { classNames, client } from "@/utils";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', message: "" })
  const [formData, setData] = useState<any>({})
  const [form, setForm] = useState('signup')
  const [sending, setSending] = useState('Generate new OTP?')


  const autoLogin = async (data: any, setErrors: any) => {
    const result: any = await signIn('credentials', {
      ...data,
      redirect: false, // Set redirect to false to prevent automatic redirection
    });

    if (result.error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text:  'Sign in failed. Check the details you provided are correct.',
      }); 

      setErrors({ password: 'Sign in failed. Check the details you provided are correct.' });
    } else {
      // Login was successful, handle accordingly (e.g., show success message)
      router.push('/profile')
      console.log('Login successful');
    }
  }

  const onSubmit = async (data: any, setErrors: any, resetForm: any) => {
    setData(data)
    setLoading(true)
    if (form == 'signup') {
      const result: any = await client('/auth/sendOtp', { body: data });
      if (result && result.success) {
        setForm('verify')
        MySwal.fire({
          title: "Success!",
          text: 'We have sent OTP on your email.',
          icon: "success"
      }) 
      } else {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: result?.message || 'Something is wrong',
        }); 
      }
    } else {
      try {
        const result: any = await client('/auth/signup', { body: data });
        if (result && result.success) {
          setForm('signup')
          autoLogin(data, setErrors)
          resetForm()
          setMessage({ type: 'success', message: result.message });
        } else {
          setMessage({ type: 'error', message: result.message || 'Something is wrong' });
        }
      } catch (error) {
        setLoading(false)
        setMessage({ type: 'error', message: 'Something is wrong please try again' });

      }

    }
    setLoading(false)
  };

  const loginSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter a full name'),
    email: Yup.string().email('Email must be a valid email').required('Please enter a email'),
    jobType: Yup.string().required('Select Employer/Freelancer'),
    password: Yup.string().required('Please enter a password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    otp: Yup.string().when('form', (otp, schema: any) => {
      if (form == 'verify') {
        return Yup.string().required('Please enter otp').min(6, "OTP must be 6 Character")
      }
      return schema
    })
  })
  const regenrateOtp = async () => {
    setSending('Sending')
    const result: any = await client('/auth/sendOtp', { body: formData });
    if (result && result.success) {
      setForm('verify')
      setMessage({ type: 'success', message: 'New OTP successfully sent' });
    } else {
      setMessage({ type: 'error', message: result.message || 'Something is wrong' });
    }
    setSending('Sent')
    setTimeout(() => {
      setSending("Generate new OTP?")
    }, 3000);

  }

  return (
    <main>
      <section className="py-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 items-center gap-4">
            <div className="text-center">
              <img src="/img/snaphub-logo.png" alt="" className="mx-auto " />
            </div>
            <div className="">
              <h3 className="w-fit font-semibold text-5xl mb-8">Welcome in SnapHub!</h3>
              <h4 className="mb-4 font-medium text-lg">Create Account</h4>
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  password: '',
                  jobType: '',
                  otp: ''

                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setErrors, resetForm }) => {
                  onSubmit(values, setErrors, resetForm)
                }}
              >
                <Form className="py-8 space-y-3 text-left">
                  {message.type.length != 0 && <div className={classNames(message.type == 'error' ? 'bg-red-100 border-red-400  text-red-700' : 'bg-green-100 border-green-400  text-green-700', 'px-4 py-3 rounded border relative')} role="alert">
                    <span className="block sm:inline">{message.message}</span>
                  </div>}
                  <InputField name="fullName" label="Full Name" />
                  <InputField name="jobType" type="select" label="Employer/Freelancer" >
                    <option value={""}>Select Employer or Freelancer</option>
                    <option value={"Employer"}>Employer</option>
                    <option value={"Freelancer"}>Freelancer</option>
                  </InputField>

                  <InputField name="email" label="Email address" />
                  <InputField name="password" type="password" label="Password" />

                  {form == 'verify' && <div>
                  <InputField name="otp" label="OTP" />
 
                    <p className='text-sm text-right  cursor-pointer' onClick={regenrateOtp} >{sending}</p>
                  </div>}

                  <Button loading={loading} type='submit'>{form == 'signup' ? 'Next' : 'Register'}</Button>

                </Form>
              </Formik>
              {/* <p className="mt-4">Already have account? <a href="/login">Log in</a></p> */}
            </div>

          </div>



        </div>
      </section>
    </main>
  );
}
