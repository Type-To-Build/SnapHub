import Image from "next/image";
import { client } from "@/utils";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import Link from "next/link";

const getCategory = async (slug: any) => {
  let res: any = await client(`/categories/slug/${slug}`)

  if (res && res.success) {
    return res.data
  } else {
    return {}
  }
}
const getPhotographers = async (user: any, category: any) => {
  try {
    let res: any = await client(`/users`, { body: { perPage: 20, filter: { jobType: 'Freelancer',category } } }, user)

    if (res && res.success) {
      return res.data.lists
    } else {
      return []
    }
  } catch (error) {
    return []
    
  }

}

export default async function ServicePage({ params: { serviceId } }: any) {
  const session = await getServerSession(authOptions)
  let category: any = await getCategory(serviceId)
  let photographers: any = await getPhotographers(session?.user, category?._id || '')

  return (
    <main>
      <section className="md:py-28 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl ml-4">{category?.name}</h2>
          <div className="grid grid-cols-3 gap-5">
            {photographers?.map((item:any,i:number) =><Link key={i} href={`/photographers/${item._id}`} className="md:mb-20 mb-5 md:p-4">
              <div className="overflow-hidden mb-5 mx-auto">
                <img className=" hover:rotate-1 transition-all hover:scale-125 w-full" src={item.avatar} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="text-2xl flex items-center font-semibold">
                  <div className="me-3 w-8 h-8 rounded-3xl flex items-center justify-center border-4 border-black p-1">
                    <img src="/img/user.svg" alt="" className="" />
                  </div>
                  {item.fullName}
                </div>
                <div className="text-2xl text-end font-semibold">
                  From {item?.price || 0}£
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="col-span-2">
                {item.shortDescription}
                </div>
                <div className="flex text-base justify-end">
                  <img className="me-3" src="/img/Star.svg" />{item.stars}
                </div>
              </div>
            </Link> )}
           
          </div>
        </div>
      </section>
    </main>
  );
}
