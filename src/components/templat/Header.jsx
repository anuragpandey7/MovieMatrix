import React from "react";
import { Link } from "react-router-dom";

const Header = ({ wallpaper }) => {
  // console.log(wallpaper);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w500${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="h-[55vh] mx-auto flex flex-col justify-end p-[4%] gap-2 text-white"
    >
      <h1 className=" w-[72%] mb-2 text-5xl font-black leading-none ">
        {wallpaper.original_title || wallpaper.original_name}
      </h1>
      <p className="w-[72%]">
        {wallpaper.overview.slice(0, 200)}{" "}
        <Link
          to={`/${wallpaper.media_type}/detail/${wallpaper.id}`}
          className="text-blue-400"
        >
          more...
        </Link>
      </p>
      <p className="flex flex-col gap-3">
        <span>
          <i className="ri-megaphone-fill text-yellow-500"></i>{" "}
          {wallpaper.release_date || wallpaper.first_air_date}
        </span>
        <span>
          <i className="ri-movie-ai-fill text-yellow-500"></i>{" "}
          {wallpaper.media_type.toUpperCase()}
        </span>
      </p>
      <Link
        to={`${wallpaper.media_type}/detail/${wallpaper.id}/trailer`}
        className="px-3 py-2 rounded-md mt-2 mb-2 shadow-sm border w-[15vw] text-center bg-opacity-50"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
