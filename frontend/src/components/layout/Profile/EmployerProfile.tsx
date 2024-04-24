import moment from "moment"

const EmployerProfile = ({ user, reviews }: any) => {
    return (<main>
        <section className="md:py-12 py-8">
            <div className="container mx-auto">
                <div className="text-center md:w-1/3 border-2 border-black p-5 md:ms-10">
                    <div className="min-w-32 w-32 h-32 flex items-center justify-center mx-auto">
                        <img src={user?.avatar} alt="" className="w-full rounded-full" />
                    </div>
                    {/* <button className="bg-black py-2 px-6 text-white text-base font-medium mx-auto rounded mt-4">Upload Photo</button> */}
                    <div className="py-4">
                        <h3 className="font-semibold text-lg">{user.fullName}</h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <div className="">
                        <ul className="flex text-lg font-semibold mb-5 justify-center">
                            <li className="me-4 pe-4 border-e border-gray-400">0
                                <span className="block text-base text-gray-400 font-normal">Projects</span>
                            </li>
                            <li className="">{reviews.length}
                                <span className="block text-base text-gray-400 font-normal">Reviews</span>
                            </li>
                        </ul> 
                    </div>
                </div>
                <div className="mt-10">
                    <h4 className="font-semibold text-xl mb-5">Reviews</h4>
                    {reviews?.map((item: any, i: number) => <div key={i} className="flex gap-4 pb-10">
                        <div className="min-w-16 w-16 h-16  flex overflow-hidden items-center justify-center">
                            <img src={item.fromUser?.avatar} alt="" className="rounded-full w-full" />
                        </div>
                        <div className="">
                            <h5 className="font-semibold text-gray-700 text-lg mb-5">{item.fromUser?.fullName}</h5>
                            <div className="flex items-center font-semibold mb-3">
                                <div className="star me-2 flex">
                                    {Array.from(Array(item.stars).keys())?.map((subitem: any, index: number) => <img key={index} className="me-2" alt="" src="/img/Star.svg" />)}
                                </div>
                                <span className=" text-gray-700 border-e-2 pe-2">5</span>
                                <span className="ms-2 text-gray-700">{moment(item.createdAt).fromNow()}</span>
                            </div>
                            <p className=" text-base font-medium mb-5 text-gray-700">{item.description}</p>
                        </div>
                    </div>)}

                </div>

            </div>
        </section>
    </main>)
}

export default EmployerProfile