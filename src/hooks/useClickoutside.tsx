"use client";

import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  action: () => void
) => {
  useEffect(() => {
    const eventClickHandler = (e: Event) => {
      if (!Array.isArray(ref)) {
        if (!ref.current?.contains(e.target as HTMLElement)) {
          action();
        }
      } else {
        let condition = false;
        ref.forEach((refitem) => {
          condition =
            condition || !!refitem.current?.contains(e.target as HTMLElement);
        });
        if (!condition) {
          action();
        }
      }
    };

    document.addEventListener("click", eventClickHandler);
    return () => {
      document.removeEventListener("click", eventClickHandler);
    };
  }, []);
};
export default useClickOutside;
