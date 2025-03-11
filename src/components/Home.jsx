import React, { useEffect, useState } from "react";
import Sidenav from "./templat/Sidenav";
import Topnav from "./templat/Topnav";
import axios from "../utils/axios";
import Header from "./templat/Header";
import HorizontalCards from "./templat/HorizontalCards";
import Dropdown from "./templat/Dropdown";
import Loading from "./templat/Loading";

const Home = () => {
  document.title = "MovieMatrix | Homepage";

  const [headerWall, setHeaderWall] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWall = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      const wallpaper =
        data.results[Math.floor(Math.random() * data.results.length)];
      setHeaderWall(wallpaper);
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  // console.log(trending,category)

  useEffect(() => {
    getTrendingData();
    !headerWall && getHeaderWall();
  }, [category]);
  return headerWall && trending ? (
    <>
      <Sidenav />
      <div className="w-[90%] h-full overflow-x-hidden">
        <Topnav />
        <Header wallpaper={headerWall} />
        <div className="mb-5 flex justify-between items-center p-5">
          <h1 className="  text-3xl text-zinc-200 font-bold ">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <HorizontalCards data={trending}/>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
