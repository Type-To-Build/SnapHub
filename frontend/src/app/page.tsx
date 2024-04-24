import { client } from "@/utils";
import Image from "next/image";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/authOptions'
import Link from "next/link";

const getCategories = async (user:any) =>{
  let res:any =await client('/categories',{body:{perPage: 9}},user)

  if(res && res.success){
    return res.data.lists
  }else{
    return []
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  let categories:any = await getCategories(session?.user)

  return (
    <main>
      <section className="py-40 banner">
      <div className="container mx-auto">
        <div className="md:w-1/2">
          <div className="bg-white md:mb-12 mb-5 inline-block px-8 py-3">
            CREATIVE
          </div>
          <p className="lg:w-4/5 text-white md:text-2xl">We focus on creating highly intuitive, usable and impactful digital products and services. Ideas is seamlessly integrated into our design process to produce the most effective, elegant and engaging work.</p>
        </div>
      </div>
    </section>
    <section className="md:py-28 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-7">
            <img src="/img/about-banner.png" />
          </div>
          <div className="col-span-5">
            <h1 className="md:text-7xl text-2xl md:mb-8 mb-5">Nice to Meet You</h1>
            <p className="mb-9 md:mb-4">Photography was always my passion and my dream job. It’s even difficult for me to call it a job, as I consider my profession as a hobby of my life. Meeting new people, catching their mood, being part of the happiest momentы of their life — isn’t it a dream?</p>
            <button className="bg-black py-4 px-6 text-white flex items-center justify-center">Want to Know More  <img className="ms-4" src="/img/arrow.png" /></button>
          </div>
        </div>
      </div>
    </section>
    <section className="serv md:py-28 py-8">
      <div className="container mx-auto text-center">
        <h2 className="md:mb-10 mb-5 pb-3 md:text-7xl text-3xl border-black border-b-8 font-semibold w-fit mx-auto">Services </h2>
        <div className="grid grid-cols-3 gap-5">
          {categories?.map((item:any,i:number) =><Link key={i} href={`/services/${item.slug}`} className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src={item.image} />
            <h3 className="md:text-3xl text-lg">{item.name}</h3>
          </Link>)}
        </div>
      </div>
    </section>
    <section className="md:py-28 py-8">
      <div className="text-center">
        <h2 className="md:text-7xl text-2xl md:mb-8 mb-6">Want to discuss in Detail?</h2>
        <button className="bg-black py-4 px-6 text-white flex items-center justify-center mx-auto">Hire Us Now <img className="ms-4" src="/img/arrow.png" /></button>
      </div>
    </section>
    </main>
  );
}
