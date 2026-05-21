import Image from "next/image";
import { AppLayout } from "./appLayout";
import heroImage from "../assets/female_short_hair.png";
import leftImage from "../assets/male_on_glasses.png";
import rightImage from "../assets/female_long_hair_glasses.png";
import { EyeWearCarousel } from "@/components/eyeWearCarousel";

const Home = () => {
  return (
    <AppLayout>
      <div className="relative z-10">
        <div className="pl-6 768:pl-12 1024:pl-20">
          <div className="flex items-center">
            <p className="text-base pr-2 text-foreground/60 tracking-wide mb-4">
              OUR VISION
            </p>
            <hr className="w-[10%] max-w-28 min-w-16 border-foreground/30" />
          </div>

          <h1 className="text-5xl 768:text-7xl 1240:text-[80px] font-bold leading-none mt-5 1024:translate-x-[2%]">
            SEE MORE.
            <br />
            <span className="inline-block text-black">DO MORE.</span>
          </h1>
        </div>
      </div>
      <section className="grid grid-cols-1 1024:grid-cols-[1fr_2fr_1fr] items-center gap-6 pt-10 mx-auto  ">
        <div className="relative overflow-hidden rounded-[30px] h-50 768:h-90 1024:h-56">
          <Image src={rightImage} alt="Model" fill className="object-cover" />
        </div>

        <div className="relative ">
          <div className="relative overflow-hidden rounded-[40px] h-130">
            <Image src={heroImage} alt="Hero" fill className="object-cover" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[30px] h-90 1024:h-56">
          <Image src={leftImage} alt="Model" fill className="object-cover" />
        </div>
      </section>

      <section className=" my-8 1024:mt-10 overflow-hidden flex flex-col items-center gap-10">
        <h2 className="text-2xl 1240:text-4xl text-center leading-none my-8  w-fit">
          CHOOSE COMFORT <br />
          <hr className="w-full border-foreground my-3" />
          <span className="font-bold"> TIMELESS STYLE</span>
        </h2>

        <EyeWearCarousel />
      </section>
      <section className="grid grid-cols-1 1024:grid-cols-[1fr_1.4fr] gap-6 pt-20">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-5xl 1240:text-6xl text-center 560:text-start leading-none">
              ELEVATE YOUR
              <br />
              <span className="font-bold">FRAME.</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[30px] h-130 1024:h-180">
            <Image src={leftImage} alt="Model" fill className="object-cover" />

            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className=" text-4xl 560:text-5xl font-semibold leading-none">
                Premium
                <br />
                Quality
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[30px] h-64">
            <Image src={heroImage} alt="Model" fill className="object-cover" />

            <div className="absolute bottom-6 left-1/2  w-full text-center -translate-x-1/2 text-white text-2xl 560:text-4xl">
              COOL ° QUIRKY ° CLASSIC
            </div>
          </div>

          <div className=" grid 480:grid-cols-[220px_1fr] gap-6 items-center">
            <div className="relative overflow-hidden rounded-[25px] h-56">
              <Image
                src={rightImage}
                alt="Model"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl 560:text-3xl 768:text-5xl 1240:text-6xl font-light leading-none">
                TRY ON.
                <br />
                ANYWHERE!
              </h2>

              <button className="mt-6 bg-primary hover:bg-primary-dark text-sm 560:text-base  rounded-full px-5 560:px-8 py-2.5 560:py-4 w-full cursor-pointer ">
                SHOP NOW
              </button>
            </div>
          </div>

          <div className="border-2 border-primary rounded-3xl p-6 flex items-center gap-3 justify-between">
            <p className="text-2xl"> Change and elevate your frame game </p>

            <div className=" hidden 480:flex w-16 min-w-16 h-16 rounded-full bg-black  items-center justify-center text-primary">
              ✦
            </div>
          </div>

          <p className="text-foreground/70 leading-relaxed max-w-3xl">
            VGlasses is a modern eyewear platform designed to enhance online
            shopping experiences through stylish virtual try-on interactions and
            immersive visual design.
          </p>
        </div>
      </section>
      <div>
        <h2 className="text-5xl 1240:text-6xl text-center leading-none mt-20">
          ONE STOP ONLINE DESTINATION FOR <br />
          <span className="font-bold">ALL YOUR EYEWEARS NEEDS.</span>
        </h2>
      </div>

      <section className="pt-20 pb-16">
        <div className="grid grid-cols-1 1024:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-foreground/60 text-sm tracking-wide mb-4">
                VIRTUAL TRY-ON EXPERIENCE
              </p>
              <hr className="w-[10%] max-w-28 min-w-16 border-foreground/30" />
            </div>

            <h2 className="text-5xl 768:text-6xl 1240:text-7xl font-bold leading-none">
              STYLE YOUR
              <br />
              VISION
            </h2>

            <p className="text-foreground/70 mt-6 max-w-md leading-relaxed">
              Explore modern frames, preview different looks, and try selected
              glasses virtually before making a choice.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {["Classic Frames", "Daily Wear", "Bold Looks"].map((item) => (
                <span
                  key={item}
                  className="px-5 py-2 rounded-full border border-primary text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button className="bg-primary hover:bg-primary-dark cursor-pointer transition-colors rounded-full px-7 py-3 text-sm font-medium">
                Try Virtually and Shop Frames
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 560:grid-cols-2 gap-5">
            <div className="relative h-80 768:h-110 overflow-hidden rounded-4xl">
              <Image
                src={heroImage}
                alt="Eyewear model"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-5 left-5 bg-white/90 rounded-full px-5 py-2 text-sm">
                Smart fit preview
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative h-48 768:h-52 overflow-hidden rounded-4xl">
                <Image
                  src={rightImage}
                  alt="Eyewear model"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-48 768:h-52 overflow-hidden rounded-4xl">
                <Image
                  src={leftImage}
                  alt="Eyewear model"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20 flex items-end p-5">
                  <p className="text-white text-2xl font-semibold leading-none">
                    Try it.
                    <br />
                    See it.
                    <br />
                    Own it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
