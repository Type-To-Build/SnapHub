import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions' 
import { client } from "@/utils"
  
const getOrders = async (user: any) => {
    try {
        let res: any = await client(`/orders`, {
            body:{
                filter:{
                    user: user._id
                },
                // populate: 'fromUser'
            }
        }, user)

        if (res && res.success) {
            return res.data.lists
        } else {
            return []
        }
    } catch (error) {
        return []

    }
}

export default async function OrdersPage() {
    const session: any = await getServerSession(authOptions)
    // let userData = await getUserDetails(session.user)
    let orders = await getOrders(session.user)
    
    return <div className="border-b h-14 px-4 bg-slate-100 flex items-center justify-between">
       Messages
    </div>
}