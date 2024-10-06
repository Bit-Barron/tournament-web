import { Navbar } from "@/components/container/navbar";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default layout;
