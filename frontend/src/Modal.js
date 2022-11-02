import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
    // elementRef.current.classList.add("modal")
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.append(elementRef.current);
    //this is for cleanup and memory leaks
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  return createPortal(
  <div>{children}</div>
      
,
    elementRef.current
  );
}
