import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions' 
import { client, currencyFormatter } from "@/utils"
import moment from "moment"
  
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
     
    return <div className="container mx-auto my-20">
        <h4 className="font-semibold text-xl mb-5">Orders List</h4>
        <div className="space-y-3">
            {orders?.map((item:any,i:number) => <div key={i} className="p-4 border rounded-md shadow">
            <p ><span className="font-semibold ">Start Date : </span> {moment(item?.startDate).format("DD MMMM YYYY")}</p>
                <p><span className="font-semibold">To Date : </span> {moment(item?.toDate).format("DD MMMM YYYY")}</p>
                <p><span className="font-semibold">Price : </span> {currencyFormatter.format(item.amount)}</p>
                <p><span className="font-semibold">Order Status : </span> {item.orderStatus}</p>


            </div>)}
        </div>
    </div>
}