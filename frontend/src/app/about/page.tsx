import Image from "next/image";

export default function Home() {
  return (
    <main> 
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
    </main>
  );
}
