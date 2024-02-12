import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-6 ">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Swift-Chat
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:flex md:w-auto gap-3"
          id="navbar-default"
        >
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="block py-1 px-2 text-white hover:text-[#1B57E9]  text-lg font-medium  hover:border-[#1B57E9]"
          >
            {isAuthenticated ? "Home" : "Login"}
          </Link>
          <Link
            href="#"
            className="block py-1 px-2 text-white hover:text-[#1B57E9]  text-lg font-medium  hover:border-[#1B57E9]"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
