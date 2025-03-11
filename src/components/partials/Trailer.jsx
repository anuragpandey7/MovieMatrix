import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../templat/NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.tvvideos);
  console.log(ytvideo);
  return (
    <div className="absolute z-10 bg-[rgba(0,0,0,0.8)] w-screen h-screen flex items-center justify-center top-0 left-0 ">
      <Link
        to={"*"}
        onClick={() => navigate(-1)}
        className="absolute text-white text-3xl top-[7%] right-[10%] ri-close-large-line hover:text-[#6556cd]  font-medium pr-2"
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          height={450}
          width={900}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          controls={true}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
