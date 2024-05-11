import Head from "next/head";
import React from "react";
import { StickyNavbar } from "../navbar/StickyNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MasterProps {
  children: React.ReactNode;
  title?: string;
  metaDesc?: string;
  metaKeyword?: string;
}
function Master({ children, title, metaDesc, metaKeyword }: MasterProps) {
  return (
    <>
      <Head>
        <title>
          {title ?? "The Creative Kit - Your creative fashion kit store"}
        </title>
        <meta
          name="description"
          content={
            metaDesc ??
            "The Creative Kit is a very powerful platform for Fashion."
          }
        />
        <meta
          name="keywords"
          content={
            metaKeyword ??
            "fashion, baju, baju high end, high end fashion, branded fashion, blouse, shirt, dress, skincare"
          }
        />

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="fixed top-0 w-full z-50 bg-white shadow">
        <StickyNavbar />
      </div>
      <div
        className={` flex flex-col gap-8 lg:gap-[60px] py-12 px-4 md:px-8 lg:px-12 xl:p-0  bg-white min-h-screen`}
      >
        {children}
        {/* <div>
            <Footer />
          </div> */}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 3000, position: "fixed" }} // Setel z-index agar tinggi
      />
    </>
  );
}

export default Master;
