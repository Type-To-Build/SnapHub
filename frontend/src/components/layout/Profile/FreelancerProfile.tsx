'use client'
import { client } from "@/utils"
import moment from "moment"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

const FreelancerProfile = ({ user, loogedInUser, reviews }: any) => {
    const router = useRouter()
    // const { data: session }: any = useSession()

    const [loading,setLoading] = useState(false)
    const getMessagesgroup = async () => {
        try {
            setLoading(true)
            let res: any = await client(`/messagesgroup/create`, {
                body: {freelancer: user._id}
             }, loogedInUser)
            setLoading(false)
    
            if (res && res.success) {
                router.push(`/profile/messages/${res.data}`)

            }  
        } catch (error) {
            setLoading(false)
         
        }
    }
    return (<main>
        <section className="md:py-24 py-8">
            <div className="container mx-auto">
                <div className="flex gap-4 mb-5 items-center">
                    <div className="me-3 w-56 h-56  overflow-hidden flex items-center justify-center p-1">
                        <img src={user.avatar} alt="" className="w-full rounded-full" />
                    </div>
                    <div className="">
                        <p className="text-lg font-semibold">{user.fullName}</p>
                        <div className="flex items-center text-lg font-semibold mb-3">
                            <div className="star me-2">
                                <img className="" alt="" src="/img/Star.svg" />
                            </div>
                            (<span>{user.stars || 5}</span>)
                            <span className="ms-2">Level 1</span>
                        </div>
                        <p className=" text-lg font-semibold mb-3">{user.shortDescription}</p>
                        {/* <ul className="flex text-lg font-semibold mb-5">
                      <li className="flex items-center justify-center me-4"><img src="/img/lucide_facebook.svg" className="me-3" /> United State</li>
                      <li className="flex items-center justify-center me-4"><img src="/img/skype.svg" className="me-3" /> English</li>
                </ul> */}
                        <button onClick={()=>{
                            if(typeof loogedInUser?.jobType == 'undefined' || loogedInUser?.jobType == 'Freelancer'){

                            }else{

                            getMessagesgroup()
                        }
                        }}   className={`bg-black py-3 px-6 text-white flex items-center justify-center text-lg text-nowrap ${typeof loogedInUser?.jobType == 'undefined' || loogedInUser?.jobType == 'Freelancer' ? ' cursor-not-allowed bg-gray-300 text-black' : ''}`}>
                             {loading && <svg className="animate-spin  mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
                            Hire Me</button>
                    </div>
                </div>
                <div className="about">
                    <h4 className="font-semibold text-xl mb-5">About Me</h4>
                    <p className="mb-5 leading-7">{user.description}
                    </p>
                </div>
                {/* <div className="about">
              <h4 className="font-semibold text-xl mb-5">Skills</h4>
              <ul className="flex text-lg font-semibold mb-5">
                <li className="flex items-center justify-center me-4"><img src="/img/lucide_facebook.svg" className="me-3" /> United State</li>
                <li className="flex items-center justify-center me-4"><img src="/img/skype.svg" className="me-3" /> English</li>
              </ul>
            </div> */}
                <h4 className="font-semibold text-xl mb-5">Work Sample</h4>

                <div className="flex flex-wrap gap-2">
                    {user?.workSample?.map((item: any, i: number) => <div key={i} className="">
                        <img className="" src={item} />
                    </div>)}


                </div>
                <div className="mt-10">
                    <h4 className="font-semibold text-xl mb-5">Reviews</h4>
                    {reviews?.map((item: any, i: number) => <div key={i} className="flex gap-4 pb-10">
                        <div className="min-w-16 w-16 h-16  flex overflow-hidden items-center justify-center">
                            <img src={item.fromUser?.avatar} alt="" className="rounded-full w-full" />
                        </div>
                        <div className="">
                            <h5 className="font-semibold text-gray-700 text-lg mb-5">{item.fromUser?.fullName}</h5>
                            <div className="flex items-center font-semibold mb-3">
                                <div className="star me-2 flex">
                                    {Array.from(Array(item.stars).keys())?.map((subitem: any, index: number) => <img key={index} className="me-2" alt="" src="/img/Star.svg" />)}
                                </div>
                                <span className=" text-gray-700 border-e-2 pe-2">5</span>
                                <span className="ms-2 text-gray-700">{moment(item.createdAt).fromNow()}</span>
                            </div>
                            <p className=" text-base font-medium mb-5 text-gray-700">{item.description}</p>
                        </div>
                    </div>)}

                </div>


            </div>
        </section>
    </main>)
}

export default FreelancerProfile