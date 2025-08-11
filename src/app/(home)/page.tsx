import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen px-6 py-12 bg-white flex items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-7xl w-full">
        {/* Text Section */}
        <div className="flex flex-col gap-6 text-center lg:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Cta Text
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            aperiam perferendis sapiente vitae, hic est sunt distinctio
            doloremque minus ratione vero eius debitis tempora! Maxime amet
            repellendus quas magnam quasi.
          </p>
          <div>
            <Button variant="destructive" size="lg">
              Order Now!
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <Image
            src="/forest-3.jpg"
            alt="forest"
            width={600}
            height={600}
            className="rounded-xl object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
