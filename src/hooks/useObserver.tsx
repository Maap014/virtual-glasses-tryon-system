import { Dispatch, RefObject, useEffect } from "react";

interface UseIntersectionObserverProps {
  ref: RefObject<HTMLDivElement | null>;
  setState: Dispatch<React.SetStateAction<boolean>>;
  threshold?: number;
}
// a custom hook that uses the Intersection Observer API to observe when an element is in view and updates the state accordingly. It takes a ref to the element, a state setter function, and an optional threshold value.
export const useIntersectionObserver = ({
  ref,
  setState,
  threshold = 0.7,
}: UseIntersectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting ? setState(false) : setState(true);
      },
      { threshold },
    );

    const current = ref.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [ref, setState, threshold]);
};
