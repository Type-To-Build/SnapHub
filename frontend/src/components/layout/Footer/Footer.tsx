import Link from "next/link";

const Footer = () =>{
    return (<>
       <footer className="bg-black text-white">
          <div className="container mx-auto md:pt-20 py-9">
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <img className="mb-4" src="/img/snaphub-logo-white.png" />
                <p className="">Photography was always my passion and my dream job. It’s even difficult for me to call it a job, as I consider my profession as a hobby of my life. Meeting new people, catching their mood, being part of the happiest momentы of their life — isn’t it a dream?</p>
              </div>
              <div className="md:ps-40">
                <h6 className="md:mb-10 mb-5 pb-3 md:text-4xl text-2xl border-white border-b-4 font-semibold w-fit">Links</h6>
                <ul className="leading-8">
                  <li><Link href="/" >Home</Link></li>
                  <li><Link href="/about" >About Us </Link></li>
                  <li><Link href="/services" >Services</Link></li>
                  <li><Link href="/photographers" >Pricing</Link></li>
                </ul>
              </div>
              <div className="">
                <h6 className="md:mb-10 mb-5 pb-3 md:text-4xl text-2xl border-white border-b-4 font-semibold w-fit">Follow Us</h6>
                <ul className="flex">
                  <li><a href="#" className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center me-4"><img src="/img/lucide_facebook.svg" /></a></li>
                  <li><a href="#" className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center me-4"><img src="/img/skype.svg" /></a></li>
                  <li><a href="#" className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center"><img src="/img/twitter.svg" /></a></li>
                </ul>

              </div>
            </div>
          </div>
          <div className="text-center py-4 text-xs">
            © Copyright by SnapHub. All right reserved.
          </div>
        </footer>
        </>)
}
export default Footer