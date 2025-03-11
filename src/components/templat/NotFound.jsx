import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-white text-3xl top-[7%] right-[10%] ri-close-large-line hover:text-[#6556cd]  font-medium pr-2"
      ></Link>
      <img
        className="w-[20%] h-[40%] object-cover"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQeDPBtrWlcgXuvJAMaAZ3jhDpFsr5Xq5FNQ&s"
        }
        alt="not found"
      />
    </div>
  );
};

export default NotFound;
