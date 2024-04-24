import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import { client } from "@/utils"
import UserList from "@/components/Messages/UserList"



export default async function MessagesLayout({ children }: any) {
    const session: any = await getServerSession(authOptions)
    // let userData = await getUserDetails(session.user)


    return <div className="container mx-auto my-20">
        <h4 className="font-semibold text-xl mb-5">Messages</h4>
        <div className="grid grid-cols-8 border h-[600px]">
            <div className="col-span-2 border-r">
                <div className="border-b p-4 bg-slate-100">
                    Photographers List
                </div>
                <UserList />

            </div>
            <div className="col-span-6">
                {children}
            </div>
        </div>
    </div>
}