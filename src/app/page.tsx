import Image from "next/image";
import { AppLayout } from "./appLayout";
import heroImage from "../assets/female_short_hair.png";
import image_1 from "../assets/Model_3.png";
import image_2 from "../assets/Model_7.png";
import image_3 from "../assets/Model_4.png";
import image_5 from "../assets/Model_6.png";
import image_4 from "../assets/Model_5.png";
import image_6 from "../assets/Model_1.png";

import { EyeWearCarousel } from "@/components/eyeWearCarousel";
import Link from "next/link";
import { VtoFlow } from "@/constants";

const Home = () => {
  return (
    <AppLayout>
      <div className="relative z-10">
        <div className="pl-6 768:pl-12 1024:pl-20">
          <div className="flex items-center">
            <p className="text-base pr-2 tracking-[0.25em] text-foreground/60  mb-4">
              OUR VISION
            </p>
          </div>

          <h1 className="text-5xl 768:text-7xl 1240:text-[80px] font-bold leading-none mt-5 1024:translate-x-[2%]">
            YOUR FRAME
            <br />
            <span className="inline-block text-black">YOUR LOOK.</span>
          </h1>
        </div>
      </div>
      <section className="grid grid-cols-1 1024:grid-cols-[1.35fr_0.65fr] gap-6 pt-12">
        <div className="relative overflow-hidden rounded-[40px] h-135">
          <Image
            src={heroImage}
            alt="Eyewear model"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[30px] h-65">
            <Image
              src={image_2}
              alt="Eyewear model"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative overflow-hidden rounded-[30px] h-90 1024:h-63">
            <Image
              src={image_1}
              alt="Model"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <section className=" my-8 1024:mt-10 overflow-hidden flex flex-col items-center gap-10">
        <h2 className="text-2xl 1240:text-4xl text-center leading-none my-8  w-fit font-bold">
          EXPLORE THE COLLECTION <br />
          <hr className="w-full border-foreground my-3" />
        </h2>

        <EyeWearCarousel />
      </section>
      <section className="pt-20">
        <div className="grid grid-cols-1 1024:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] text-foreground/60 mb-4">
              FIND YOUR FRAME
            </p>

            <h2 className="text-5xl 768:text-6xl 1240:text-7xl font-bold leading-none">
              TRY IT.
              <br />
              SEE IT.
              <br />
              CHOOSE IT.
            </h2>

            <p className="text-foreground/70 mt-6 max-w-md leading-relaxed">
              Browse different styles and preview selected frames on your face
              before making a choice.
            </p>

            <Link
              href="/shop"
              className="inline-block mt-8 bg-primary hover:bg-primary-dark cursor-pointer transition-colors rounded-full px-7 py-3 text-sm font-medium"
            >
              Explore Frames
            </Link>
          </div>

          <div className="relative h-130 overflow-hidden rounded-[40px]">
            <Image
              src={image_3}
              alt="Eyewear model"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute bottom-6 left-6 bg-white rounded-full px-5 py-2 text-sm">
              Virtual Try-On
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 560:grid-cols-3 gap-5 mt-8">
          {VtoFlow.map((step, i) => (
            <div
              key={i}
              className="border-2 border-primary hover:border-[#3ab79a] transition-colors duration-200 rounded-3xl p-5"
            >
              <p className="font-semibold text-lg">{step.name}</p>
              <p className="text-sm text-foreground/70 mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div>
        <h2 className="text-5xl 1240:text-6xl text-center leading-none mt-20">
          YOUR ONLINE DESTINATION FOR <br />
          <span className="font-bold"> YOUR EYEWEAR.</span>
        </h2>
      </div>

      <section className="pt-20 pb-16">
        <div className="grid grid-cols-1 1024:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-foreground/60 text-sm  tracking-[0.25em] mb-4">
                VIRTUAL TRY-ON EXPERIENCE
              </p>
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
              <Link
                href="/shop"
                className="bg-primary hover:bg-primary-dark cursor-pointer transition-colors rounded-full px-7 py-3 text-sm font-medium"
              >
                Try Virtually and Shop Frames
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 560:grid-cols-2 gap-5">
            <div className="relative h-80 768:h-110 overflow-hidden rounded-4xl">
              <Image
                src={image_6}
                alt="Eyewear model"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-5 left-5 bg-white/90 rounded-full px-5 py-2 text-sm">
                Smart fit preview
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative h-48 768:h-52 overflow-hidden rounded-4xl">
                <Image
                  src={image_4}
                  alt="Eyewear model"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className=" group relative h-48 768:h-52 overflow-hidden rounded-4xl">
                <Image
                  src={image_5}
                  alt="Eyewear model"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
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
