import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { FiMap } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-background text-background-foreground flex flex-col bg-[#212124] text-white">
      <header className="bg-muted/40 px-2 md:px-4 py-1 md:py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiMap size={20}/>
          <h2 className="hidden md:block text-lg font-medium">Locator</h2>
        </div>
        <div className="flex items-center md:gap-4">
          <div className="relative flex-1 max-w-md scale-[0.8] md:scale-[1] translate-x-[1rem] md:translate-x-[0rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="flex h-10 w-full border border-zinc-700 border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 pr-4 py-2 rounded-md bg-muted/50 focus:bg-background focus:ring-1 focus:ring-primary focus:outline-none bg-[#2E2E33]"
              placeholder="Search users..."
              type="search"
            />
          </div>
          <button>
            <IoIosLogOut size={22} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
