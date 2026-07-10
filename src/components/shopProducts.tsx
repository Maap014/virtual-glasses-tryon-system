"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getGlasses } from "@/services/api";
import { ProductType } from "@/types";
import { toast } from "sonner";

const categories = [
  { key: "All Frames", value: "all" },
  { key: "Eyeglasses", value: "eyeglasses" },
  { key: "Sunglasses", value: "sunglasses" },
  { key: "Blue Light", value: "blue_light" },
  { key: "Sports", value: "sports" },
  { key: "Fashion", value: "fashion" },
];

export const ShopProducts = () => {
  const experience = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGlasses = async () => {
      try {
        const data = await getGlasses(selectedCategory);
        setProducts(data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load data.  Please try again.");
        console.error("Error fetching glasses:", error);
        setIsLoading(false);
      }
    };

    loadGlasses();
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting ? setIsSticky(false) : setIsSticky(true);
      },
      { threshold: 0.7 },
    );
    const current = (experience as React.RefObject<HTMLDivElement>)
      ?.current as HTMLDivElement | null;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [experience]);

  return (
    <div>
      <div
        className={clsx(
          isSticky ? "sticky" : "",
          "top-17 1024:top-18 z-40 px-3 960:px-0 bg-white/80 backdrop-blur-md py-3 mt-10 transition-all ease-in-out duration-500 ",
        )}
      >
        <div className="flex 960:justify-center text-nowrap gap-4 overflow-x-scroll hidden-scrollbar ">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className={clsx(
                selectedCategory === category.value
                  ? "border-[#3ab79a]"
                  : "border-border",
                "px-5 py-2.5 rounded-full border  hover:border-[#3ab79a] transition-colors text-sm cursor-pointer",
              )}
            >
              {category.key}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-foreground/70">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-red-600">
          no products to display
        </div>
      ) : (
        <section className="grid 560:grid-cols-2 880:grid-cols-3 1240:grid-cols-4 gap-8 mt-10">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-3xl h-72 bg-card border border-primary shadow-md">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 880px) 50vw, (max-width: 1240px) 33vw, 25vw"
                  className="object-contain p-8 pb-20 group-hover:scale-105 transition-transform duration-500"
                />

                <button className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-primary hover:bg-primary-dark transition-colors rounded-full px-6 py-3 text-sm font-medium cursor-pointer">
                  Try Virtually
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between gap-2.5">
                  <h3 className="text-base 768:text-lg font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-base 768:text-lg font-medium">
                    £{Number(product.price).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between gap-2">
                  <p className="text-foreground/60 mt-1 text-sm">
                    Premium Eyewear
                  </p>

                  <button className="bg-primary hover:bg-primary-dark transition-colors rounded-3xl px-5 py-2 text-sm font-medium cursor-pointer">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <section
        ref={experience}
        className="mt-24 rounded-[40px] border border-border hover:border-[#3ab79a] transition-colors duration-200  p-8 768:p-14 flex flex-col 1024:flex-row items-center justify-between gap-10"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            AI Powered Experience
          </p>

          <h2 className="text-4xl 768:text-6xl font-bold leading-none mt-4 text-center 1240:text-start">
            TRY BEFORE
            <br />
            YOU BUY
          </h2>
        </div>

        <div className="max-w-xl">
          <p className="text-foreground/70 leading-relaxed">
            Use our virtual try-on experience to preview frames in real time and
            discover styles that suit your face and personality.
          </p>
        </div>
      </section>
    </div>
  );
};
