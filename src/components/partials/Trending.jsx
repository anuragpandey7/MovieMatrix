import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Topnav from "../templat/Topnav";
import Dropdown from "../templat/Dropdown";
import axios from "../../utils/axios";
import Loading from "../templat/Loading";
import Cards from "../templat/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title =
    "MovieMatrix | Trending | " +
    category.replace(/^./, (char) => char.toUpperCase());

  const navigate = useNavigate();

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${duration}?page=${page}`
      );
      // setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  const refreshHandler = async () => {
    if (trending.length === 0) {
      getTrendingData();
    } else {
      setPage(1);
      setTrending([]);
      await getTrendingData();
    }
  };

  useEffect(() => {
    // setTrending(getTrendingData());
    refreshHandler();
  }, [category, duration]);
  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-24  w-full  flex items-center justify-between overflow-x-hidden">
        <h1 className="text-2xl font-semibold text-zinc-300">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
          ></i>
          Trending
        </h1>
        <div className="z-50">
          <Topnav />
        </div>

        <div className=" relative z-50 w-[30vw]">
          <div className="flex gap-5 justify-between ">
            <Dropdown
              title="Category"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
            <Dropdown
              title="Duration"
              options={["day", "week"]}
              func={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrendingData}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
