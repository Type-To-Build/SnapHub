import Image from "next/image";

export default function Client() {
  return (
    <main>
    <section className="md:py-12 py-8">
      <div className="container mx-auto">
        <div className="text-center md:w-1/3 border-2 border-black p-5 md:ms-10">
          <div className="min-w-32 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto">
            <img src="/img/user-profile.png" alt="" className="" />
          </div>
          <button className="bg-black py-2 px-6 text-white text-base font-medium mx-auto rounded mt-4">Upload Photo</button>
          <div className="py-4">
              <h3 className="font-semibold text-lg">Nancy Nancy</h3>
              <p className="text-sm text-gray-400">nancy.shopyvilla@gmail.com</p>
            </div>
          <div className="">
              <ul className="flex text-lg font-semibold mb-5 justify-center">
                  <li className="me-4 pe-4 border-e border-gray-400">1
                    <span className="block text-base text-gray-400 font-normal">Projects</span>
                  </li>
                  <li className="">1
                    <span className="block text-base text-gray-400 font-normal">Reviews</span>
                  </li>
            </ul>
            <button className="bg-black py-3 px-6 text-white w-full font-medium">Logout</button>
          </div>
        </div>
        <div className="flex gap-4 pt-10">
          <div className="min-w-16 w-16 h-16 rounded-3xl flex items-center justify-center">
            <img src="/img/user-profile.png" alt="" className="" />
          </div>
          <div className="">
            <h5 className="font-semibold text-gray-700 text-lg mb-5">Ronaldo8520</h5>
            <div className="flex items-center font-semibold mb-3">
              <div className="star me-2 flex">
                <img className="" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
              </div>
              <span className=" text-gray-700 border-e-2 pe-2">5</span>
              <span className="ms-2 text-gray-700">2 Month ago</span>
            </div>
            <p className=" text-base font-medium text-gray-700">Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it... <a href="">See More</a></p>
          </div>
        </div>
        <div className="flex gap-4 pt-10 mt-10 border-t-2 border-gray-200">
          <div className="min-w-16 w-16 h-16 rounded-3xl flex items-center justify-center">
            <img src="/img/user-profile.png" alt="" className="" />
          </div>
          <div className="">
            <h5 className="font-semibold text-gray-700 text-lg mb-5">Ronaldo8520</h5>
            <div className="flex items-center font-semibold mb-3">
              <div className="star me-2 flex">
                <img className="" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
              </div>
              <span className=" text-gray-700 border-e-2 pe-2">5</span>
              <span className="ms-2 text-gray-700">2 Month ago</span>
            </div>
            <p className=" text-base font-medium text-gray-700">Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it... <a href="">See More</a></p>
          </div>
        </div>
        <div className="flex gap-4 pt-10 mt-10 border-t-2 border-gray-200">
          <div className="min-w-16 w-16 h-16 rounded-3xl flex items-center justify-center">
            <img src="/img/user-profile.png" alt="" className="" />
          </div>
          <div className="">
            <h5 className="font-semibold text-gray-700 text-lg mb-5">Ronaldo8520</h5>
            <div className="flex items-center font-semibold mb-3">
              <div className="star me-2 flex">
                <img className="" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
                <img className="ms-2" alt="" src="/img/Star.svg" />
              </div>
              <span className=" text-gray-700 border-e-2 pe-2">5</span>
              <span className="ms-2 text-gray-700">2 Month ago</span>
            </div>
            <p className=" text-base font-medium text-gray-700">Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it Photography was always my passion and my dream job. It’s even difficult for me to call it... <a href="">See More</a></p>
          </div>
        </div>
      
      </div>
    </section>
    </main>
  );
}
