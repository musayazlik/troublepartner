import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
