"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "bg-slate-100",
          color: "black",
        }
      }}
    />
   );
}

export default ToasterProvider;
