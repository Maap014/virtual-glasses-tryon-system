import Image from "next/image";
import { eyeWearsDisplay } from "@/constants";

export const EyeWearCarousel = () => {
  return (
    <div className="flex overflow-hidden items-center gap-5 animate-marquee w-max">
      {[...eyeWearsDisplay, ...eyeWearsDisplay].map((glass, index) => (
        <div
          key={index}
          className="w-20 h-20 rounded-full border-2 border-primary-dark flex items-center justify-center shrink-0"
        >
          <div className="relative w-20 h-20">
            <Image
              src={glass.image}
              alt="Glasses"
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
