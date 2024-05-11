"use client";
import React from "react";
import Master from "../components/layout/master";

function login() {
  return (
    <Master title="Ujian Kompri - Login ">
      <div className="flex flex-col items-center justify-center bg-red-300 h-screen">
        <div className="flex items-center justify-center flex-1 w-full text-center">
          <div className="grid w-full grid-cols-1 mx-auto border shadow max-w-7xl md:grid-cols-2">
            <div className="flex items-center justify-center gap-10 px-4 py-24 sm:px-14">
              {/* <FormInput /> */}ssdf
            </div>
            <div className="w-full h-full text-white ">
              {/* <WelcomePart /> */}
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default login;
