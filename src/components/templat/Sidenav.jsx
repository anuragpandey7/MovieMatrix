import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full  border-zinc-400 border-r-[1px] p-10 font-bold">
      <h1 className="hover:scale-105 duration-300 flex text-2xl text-white">
        <i className="ri-tv-fill text-[#6556cd] mr-2"></i>
        <span>MovieMatrix</span>
      </h1>
      <nav className=" flex flex-col text-zinc-400">
        <h1 className="mt-10 mb-5  text-white font-semibold text-xl">
          New Feeds
        </h1>
        <Link to={"/trending"} className=" hover:bg-[#6556cd] p-3 hover:scale-105 hover:text-white rounded-lg duration-300">
          <i className="ri-fire-fill text-[#FF8A27] mr-1"></i> Trending
        </Link>
        <Link to={"/popular"} className="hover:bg-[#6556cd] hover:scale-105 p-3 hover:text-white rounded-lg duration-300">
          <i className="ri-bard-fill mr-1"></i> Popular
        </Link>
        <Link to={"/movie"} className="hover:bg-[#6556cd] hover:scale-105 p-3 hover:text-white rounded-lg duration-300">
          <i className="ri-movie-2-line mr-1"></i> Movies
        </Link>
        <Link to={"/tv"} className="hover:bg-[#6556cd] hover:scale-105 p-3 hover:text-white rounded-lg duration-300">
          <i className="ri-tv-line mr-1"></i> Tv Shows
        </Link>

        <Link to={"/people"} className="hover:bg-[#6556cd] hover:scale-105 p-3 hover:text-white rounded-lg duration-300">
          <i className="ri-user-2-line mr-1"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-transparent bg-zinc-400 mt-5" />

      <nav className=" flex flex-col text-zinc-400">
        <h1 className="mt-10 mb-5  text-white font-semibold text-xl">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556cd] p-3 hover:scale-105 hover:text-white rounded-lg duration-300">
          <i className="ri-arrow-right-s-line mr-1"></i> About MovieMatrix
        </Link>
        <Link className="hover:bg-[#6556cd] hover:scale-105 p-3 hover:text-white rounded-lg duration-300">
          <i className="ri-phone-fill mr-1"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
