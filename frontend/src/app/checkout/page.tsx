import Image from "next/image";

export default function Client() {
  return (
    <main>
    <section className="py-8">
      <div className="container mx-auto">
      <h3 className="w-fit font-semibold text-5xl mb-8">Checkout</h3>
        <div className="grid md:grid-cols-2 gap-4 md:gap-12">
          <div className="">
              <h4 className="mb-6 font-medium text-2xl pb-6 border-b border-black">PERSONAL DETAILS</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="">
                  <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="First name" />
                </div>
                <div className="">
                  <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="mb-7">
                  <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="Email or Username" />
                  <input className="px-4 py-3 border-2 border-black w-full mb-4" type="password" placeholder="Your Password" />
              </div>
          </div>
          <div className="">
            <h4 className="mb-6 font-medium text-2xl pb-6 border-b border-black">BILLING DETAILS</h4>
            
            <div className="mb-6">
                <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="Name on Card" />
                <input className="px-4 py-3 border-2 border-black w-full mb-4" type="password" placeholder="Card Number" />
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="">
                    <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="Expiry date (MM/YYYY)" />
                  </div>
                  <div className="">
                    <input className="px-4 py-3 border-2 border-black w-full mb-4" type="text" placeholder="CVV (3 digits)" />
                  </div>
                </div>
            </div>
            <div className="grid md:grid-cols-12 gap-4 bg-green-100 p-5">
                  <div className="col-span-10">
                    <input className="px-4 py-3 border border-black w-full md:mb-0 mb-4" type="text" placeholder="Have a gift or promo code?" />
                  </div>
                  <div className="col-span-2">
                    <button className="bg-blue-500 py-3 px-6 text-white w-full font-medium">Apply</button>
                  </div>
                </div>
            <p className="mb-4">Terms and conditions apply</p>
            <button className="bg-blue-500 py-3 px-6 text-white w-full font-medium">CHECKOUT</button>
        </div>

        </div>
        
        
      
      </div>
    </section>
    </main>
  );
}
