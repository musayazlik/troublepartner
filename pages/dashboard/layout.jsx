import React from "react";
import Image from "next/image";
import Header from "@/components/dashboard/header";
import Footer from "@/components/dashboard/footer";
import Sidebar from "@/components/dashboard/sidebar";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="wrapper flex min-w-full min-h-full   bg-slate-50">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className=" flex flex-col w-full">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="h-full min-h-screen">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
