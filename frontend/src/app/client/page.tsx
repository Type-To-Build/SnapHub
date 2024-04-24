import Image from "next/image";

export default function Client() {
  return (
    <main>
    <section className="md:py-28 py-8">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-3 gap-5">
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/Fashion.png" />
            <h3 className="md:text-3xl text-lg">Fashion Photography</h3>
          </div>
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/Wedding.png" />
            <h3 className="md:text-3xl text-lg">Wedding Photography</h3>
          </div>
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/Events-1.png" />
            <h3 className="md:text-3xl text-lg">Conferences Photography</h3>
          </div>
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/conferences.png" />
            <h3 className="md:text-3xl text-lg">Events Photography</h3>
          </div>
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/Travel.png" />
            <h3 className="md:text-3xl text-lg">Travel Photography</h3>
          </div>
          <div className="md:mb-20 mb-5">
            <img className="mb-5 mx-auto" src="/img/wild.png" />
            <h3 className="md:text-3xl text-lg">Street Photography</h3>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
