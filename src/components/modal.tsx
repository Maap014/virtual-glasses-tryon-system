import { PropsWithChildren, useEffect, useRef } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ModalProps } from "@/types";
import { CloseIcon } from "./svg";

export const Modal = ({
  className,
  children,
  onClick,
}: PropsWithChildren<ModalProps>) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeBackground = (e: MouseEvent) => {
      if (e.target === backgroundRef.current && onClick) {
        onClick();
      }
    };
    document.addEventListener("click", closeBackground);

    return () => {
      document.removeEventListener("click", closeBackground);
    };
  }, [backgroundRef]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={backgroundRef}
      className={clsx(
        "bg-[#00000099] fixed z-50 inset-0 w-full h-dvh flex items-center justify-center",
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.2,
          stiffness: 400,
          type: "spring",
          damping: 24,
        }}
        className={clsx(
          "w-[80%] 640:w-[70%] 1180:w-[50%] ",
          "relative rounded-[18px] bg-background  p-7  drop-shadow-2xl",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClick}
          className="rounded-full  absolute right-1 top-1 p-2 cursor-pointer hover:bg-foreground/10 transition-colors"
        >
          <CloseIcon className="h-5 w-5 640:h-6 640:w-6" fill="" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};
