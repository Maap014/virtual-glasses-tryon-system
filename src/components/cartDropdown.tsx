"use client";

import Image from "next/image";
import { useCart } from "@/components/context/cartContext";

export const CartDropdown = () => {
  const {
    cartItems,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div className="absolute right-0 top-2 768:top-14 z-50 w-85 rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-semibold text-lg">Your Cart</h3>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-foreground/50 hover:text-foreground cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="py-14 text-center">
          <p className="text-sm text-foreground/60">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-[360px] overflow-y-auto hidden-scrollbar">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 px-5 py-4 border-b border-border"
              >
                <div className="relative w-16 h-16 shrink-0 rounded-xl border border-border overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>

                  <p className="text-sm text-foreground/60 mt-1">
                    £{Number(item.price).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="cursor-pointer hover:text-primary-dark"
                      >
                        −
                      </button>

                      <span className="text-sm min-w-4 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="cursor-pointer hover:text-primary-dark"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4">
            <div className="flex justify-between font-semibold mb-4">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
