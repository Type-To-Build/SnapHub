import Image from "next/image";
import { client } from "@/utils";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import Link from "next/link";

const getCategories = async (user: any) => {
  let res: any = await client('/categories', { body: { perPage: 9 } }, user)

  if (res && res.success) {
    return res.data.lists
  } else {
    return []
  }
}

export default async function ServicesPage() {
  const session = await getServerSession(authOptions)
  let categories: any = await getCategories(session?.user)

  return (
    <main>
      <section className="  md:py-28 py-8">
        <div className="container mx-auto text-center">
          <h2 className="md:mb-10 mb-5 pb-3 md:text-7xl text-3xl border-black border-b-8 font-semibold w-fit mx-auto">Services </h2>
          <div className="grid grid-cols-3 gap-5">
            {categories?.map((item: any, i: number) => <Link key={i} href={`/services/${item.slug}`} className="md:mb-20 mb-5">
              <img className="mb-5 mx-auto" src={item.image} />
              <h3 className="md:text-3xl text-lg">{item.name}</h3>
            </Link>)}

          </div>
        </div>
      </section>

    </main>
  );
}
