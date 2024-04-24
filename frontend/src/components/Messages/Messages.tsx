'use client'
import { client } from "@/utils"
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import Button from "../Buttons/Button";
import moment from "moment";


const Messages = ({ employer, freelancer, groupId }: any) => {

    const [loading, setLoading] = useState(false)
    const containerRef:any = useRef(null);

    const { data: session }: any = useSession()
    const [messageList, setmessageList] = useState([])
    const [msg, setMsg] = useState<string>('')
    useEffect(() => {
        getMessagesgroup(session.user)

    }, [])
    const scrollToBottom = () => {
        if (containerRef.current) {
          // Set the scroll position to the bottom
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      };
    const getMessagesgroup = async (user: any) => {
        try {
            setLoading(true)
            let res: any = await client(`/messages`, { body: { messageGroup: groupId } }, user)
            setLoading(false)

            if (res && res.success) {
                setmessageList(res.data)
                setTimeout(() => {
                scrollToBottom();
                    
                }, 500);
            }
        } catch (error) {
            setLoading(false)

        }
    }
    const sendMessage = async () => {

        try {
            let oldMessages: any = [...messageList]
            let msgg = msg
            oldMessages.push({
                employer: employer._id, freelancer: freelancer._id,
                messageGroup: groupId,
                msg: msgg,
                sendBy: session.user._id,
                createdAt: moment().toDate()
            })
            setmessageList(oldMessages)

            setMsg('')

            await client(`/messages/create`, {
                body: {
                    employer: employer._id, freelancer: freelancer._id,
                    sendBy: session.user._id,
                    messageGroup: groupId, msg
                }
            }, session.user)

            scrollToBottom();


        } catch (error) {

        }
    }
    let reciverData = employer?._id == session.user?._id ? freelancer : employer
    return (<div className="h-full">
        <div className="h-[477px] overflow-scroll p-4"  ref={containerRef}>
            {loading && <svg className="animate-spin  mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}

            {messageList?.map((item: any, i: number) => {
                let userData = item.sendBy == session.user._id ? session.user : reciverData

                if (item.sendBy == session.user._id) {
                    return (<div className={`flex items-start gap-2.5 mb-5 justify-end `}>
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{userData.fullName}</span>

                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{item.msg}</p>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(item.createdAt).fromNow()}</span>
                        </div>
                        <img className="w-8 h-8 rounded-full" src={userData.avatar} alt={userData.fullName} />
                    </div>)
                } else {
                    return (<div className={`flex items-start gap-2.5 mb-5 justify-end `}>
                        <img className="w-8 h-8 rounded-full" src={userData.avatar} alt={userData.fullName} />
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{userData.fullName}</span>

                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{item.msg}</p>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(item.createdAt).fromNow()}</span>
                        </div>
                    </div>)
                }

            })}




        </div>
        <div className="border-t flex items-center space-x-4 px-4">
            <textarea className="w-full outline-0 p-2" placeholder="write something..." onChange={(e: any) => setMsg(e.target.value)} value={msg}></textarea>
            <button className="bg-black rounded-md py-2 px-6 text-white text-sm disabled:bg-gray-500" disabled={msg.length == 0} onClick={sendMessage}>Send</button>
        </div>
    </div>)
}
export default Messages