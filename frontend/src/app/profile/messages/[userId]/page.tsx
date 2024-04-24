import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import { client } from "@/utils"
import Messages from "@/components/Messages/Messages"
import CreateOfferPopup from "./CreateOfferPopup"
import ViewOfferPopup from "./ViewOfferPopup"

const getUserDetails = async (user: any, userId: string) => {
    try {
        let res: any = await client(`/messagesgroup/${userId}`, {}, user)


        if (res && res.success) {
            return res.data
        } else {
            return {}
        }
    } catch (error) {
        return {}

    }
}

export default async function MessagePage({ params: { userId } }: any) {
    const session: any = await getServerSession(authOptions)
    let fData = await getUserDetails(session.user, userId)
    // let orders = await getOrders(session.user)
    console.log(fData._id,'-fData');
    
    let userData = session.user.jobType == "Employer" ? fData.toUser : fData.fromUser

    return <div className="">
        <div className="border-b h-14 px-4 bg-slate-100 flex items-center justify-between">
            <div>Messages - <b>{userData?.fullName}</b></div>
            <div className="flex items-center space-x-4">
                <span className="text-nowrap">Running Orders: {fData?.runnigOrder}</span>
                {fData?.runnigOrder == 0 ? <CreateOfferPopup userId={fData.toUser._id}  groupId={fData._id}  /> : <ViewOfferPopup freelancerData={fData.toUser} groupId={fData?._id}  />}
            </div>
        </div>
        <div className="h-full">
            <Messages employer={fData.fromUser} freelancer={fData.toUser} groupId={fData._id}  />
        </div>
    </div>
}