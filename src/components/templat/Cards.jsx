import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data,title }) => {
  // console.log(data,title);
  return (
    // bg-[#1F1e24]
    <div className="px-[3%] z-0 flex flex-wrap w-full justify-center items-center bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/detail/${c.id}`}
          className=" relative  w-[30vh] h-[50vh] mr-[4%] mb-[4%]"
          key={i}
        >
          <img
            className="transform transition-transform duration-300 hover:scale-105 shadow-[8px_18px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/w500${
              c.backdrop_path || c.profile_path
            }`}
          />
          <h1 className="text-xl mt-3 text-zinc-400 font-normal">
            {c.name || c.original_name || c.title || c.original_title}
          </h1>
          {c.vote_average && (
            <div className=" rounded-full text-gray-100 h-[7vh] w-[7vh] font-semibold text-xl flex items-center justify-center bg-yellow-600 absolute -right-5 bottom-28">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
