'use client'
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Dropdown from "@/components/Dropdown/Dropdown";
import { signOut } from "next-auth/react"


const Header = () => {
  const { data: session }: any = useSession()

  return (<>
    <div className="bg-black">
      <div className="container mx-auto py-2">
        <div className="flex justify-end">
          <ul className="flex text-sm">
            {session?.user ? <>
              <li>
                <Dropdown title={<div  className="text-white pe-3  flex">
                  <img src={session.user.avatar} className="me-2 rounded-full border w-5 h-5" />
                  {session.user.fullName}
                </div>}>
                  <ul className=" w-32">
                    <li><Link href={'/profile'} className="p-4 py-2 border-b  block">My Profile</Link></li>
                    <li><Link href={'/profile/edit'} className="p-4 py-2 border-b  block">Edit Profile</Link></li>
                    <li><Link href={'/profile/orders'} className="p-4 py-2 border-b  block">Orders</Link></li>
                    <li><Link href={'/profile/messages'} className="p-4 py-2 border-b  block">Messages</Link></li>
                    <li className="p-4 py-2 block cursor-pointer" onClick={async () => {
                      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login` })
                    }} >Logout</li>
                  </ul>
                </Dropdown>
              </li>

            </> : <>
              <li><Link href={"/auth/login"} className="text-white border-e border-white pe-3">Log In</Link></li>
              <li><Link href={"/auth/register"} className="text-white ps-3">Create Account</Link></li>
            </>}

          </ul>
        </div>
      </div>
    </div>
    <header className="bg-white">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="brand py-1">
            <img className=" h-20" src="/img/snaphub-logo.png" />
          </Link>
          <ul className="flex  h-full">
            <li><Link href={"/"} className="px-10 ">Home</Link></li>
            <li><Link href={"/about"} className="px-10 ">About</Link></li>
            <li><Link href={"/services"} className="px-10 ">Services</Link></li>
            <li><Link href={"/photographers"} className="px-10 ">Pricing</Link></li>
          </ul>
          <div className="">
            <Link href="/photographers" className="text-white bg-black text-base rounded-xl py-3 px-6">Book Now</Link>
          </div>
        </div>
      </div>
    </header>
    {/* <header className="bg-white">
          <div className="container mx-auto py-6">
            <div className="flex items-center justify-between">
              <div className="brand">
                <img className="" src="/img/snaphub-logo.png" />
              </div>
              <div className="flex items-center justify-center">
                <div className="border-4 border-black flex items-center justify-center">
                  <input type="text" className="h-12 min-w-96" />
                  <div className="bg-black w-20 text-center flex items-center justify-center h-12">
                    <img className="mx-auto" src="/img/search.svg" />
                  </div>
                </div>
                <div className="w-16 h-16 relative me-12 ms-6">
                  <img className="" src="/img/message.svg" />
                  <div className="bg-black w-8 h-8 rounded-2xl text-white flex items-center justify-center absolute font-semibold top-[-10px] right-[-30px]">
                    1
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center me-4">
                  <img className="" src="/img/user.svg" />
                </div>
              </div>
            </div>
          </div>
        </header> */}
  </>)
}
export default Header