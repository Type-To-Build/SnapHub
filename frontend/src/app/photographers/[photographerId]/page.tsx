import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import EmployerProfile from "@/components/layout/Profile/EmployerProfile"
import FreelancerProfile from "@/components/layout/Profile/FreelancerProfile"
import { client } from "@/utils"
const getUserDetails = async (user: any) => {
    try {
        let res: any = await client(`/users/${user}`, {}, user)

        if (res && res.success) {
            return res.data
        } else {
            return {}
        }
    } catch (error) {
        return {}

    }
}
const getReviews = async (user: any) => {
    try {
        let res: any = await client(`/reviews`, {
            body:{
                filter:{
                    toUser: user._id
                },
                populate: 'fromUser'
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


export default async function FreelancerPublicProfile({ params: { photographerId } }: any) {
  const session: any = await getServerSession(authOptions)
  let userData = await getUserDetails(photographerId)
  let reviews = await getReviews(session?.user || {})

  return (<FreelancerProfile user={userData} loogedInUser={session?.user} reviews={reviews} />);
}
