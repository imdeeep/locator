import React, { useState } from 'react';
import Login from '@/components/Login';
import Signin from '@/components/Signin';
import Link from 'next/link';

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex lg:flex-row bg-[#E6E6E6] min-h-[100vh]">
      <div className="flex-1 hidden lg:flex flex-col text-black p-8 mt-10 translate-x-[3rem]">
        <h1 className="text-4xl tracking-[-1px] font-bold">Welcome to Locator</h1>
        <p className="mt-2 text-lg">A real-time location-based app built by <Link href="https://www.linkedin.com/in/mandeepyadav27/" target='_blank' className='underline text-[#3D3D43]'>Mandeep</Link>.</p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center  p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="flex mb-2">
            <div className="inline-flex items-center bg-[#3D3D43] rounded-lg p-1">
              <button
                type="button"
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "login" ? "bg-[#0F0F10] text-white" : "text-white"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "signup" ? "bg-[#0F0F10] text-white" : "text-white"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
          {activeTab === "login" ? <Login /> : <Signin />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
