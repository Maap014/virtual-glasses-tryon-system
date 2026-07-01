"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { eyeWearsDisplay } from "@/constants";

const duplicatedGlasses = [...eyeWearsDisplay, ...eyeWearsDisplay];

export const EyeWearCarousel = () => {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-3.5 flex-nowrap items-center"
        animate={{
          x: ["0%", "-40%"],
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 10,
          },
        }}
      >
        {duplicatedGlasses.map((glass, index) => (
          <div
            key={index}
            className="w-20 h-20 rounded-full border-2 border-primary-dark flex items-center justify-center shrink-0"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={glass.image}
                alt="Glasses"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
