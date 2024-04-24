'use client'
import { client } from "@/utils"
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'


const UserList = () => {
    const pathname = usePathname()

    const { data: session }: any = useSession()
    const [usersList, setusersList] = useState([])
    useEffect(() => {
        getMessagesgroup(session.user)

    }, [])

    const getMessagesgroup = async (user: any) => {
        try {
            let res: any = await client(`/messagesgroup`, {}, user)

            if (res && res.success) {
                setusersList(res.data)
            }
        } catch (error) {

        }
    }
    return (<div>

        {usersList?.map((item: any, i: number) => {

            let userData = session.user.jobType == "Employer" ? item.toUser : item.fromUser
            return <Link href={`/profile/messages/${item._id}`} key={i} className={`flex space-x-2 items-center border-b p-3 ${pathname.includes(item._id) && 'bg-gray-100'}`}>
                <img src={userData.avatar} className="w-12 rounded-full" />
                <div>
                    <p>{userData.fullName}</p>
                </div>
            </Link>
        })}
    </div>)
}
export default UserList