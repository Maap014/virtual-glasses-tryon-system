import { ShopProducts } from "@/components/shopProducts";
import { AppLayout } from "../appLayout";

const Shop = () => {
  return (
    <AppLayout>
      <section className=" relative">
        <div className="text-center 768:text-start">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Discover eyewear
          </p>

          <h1 className="text-5xl 768:text-7xl 1240:text-[80px] font-bold leading-none mt-4">
            FIND YOUR
            <br />
            PERFECT FRAME
          </h1>
        </div>

        <ShopProducts />
      </section>
    </AppLayout>
  );
};

export default Shop;
