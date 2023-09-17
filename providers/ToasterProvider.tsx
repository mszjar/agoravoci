"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "bg-gray-100",
          color: "black",
        }
      }}
    />
   );
}

export default ToasterProvider;
