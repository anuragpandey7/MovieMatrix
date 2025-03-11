import React from "react";
import Loader from "../../assets/Loader.gif"

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
    <img className="w-[20%] h-[40%] object-cover" src={Loader} alt="Loading..." />
    </div>
  );
};

export default Loading;
