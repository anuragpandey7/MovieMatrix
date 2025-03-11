import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../templat/Cards";
import Loading from "../templat/Loading";
import Dropdown from "../templat/Dropdown";
import Topnav from "../templat/Topnav";

const Popular = () => {
  const [category, setCategory] = useState("movie");
  //   const [duration, setDuration] = useState("day");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title =
    "MovieMatrix | Popular | " +
    category.replace(/^./, (char) => char.toUpperCase());

  const navigate = useNavigate();

  const getPopularData = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  const refreshHandler = async () => {
    if (popular.length === 0) {
      getPopularData();
    } else {
      setPage(1);
      setPopular([]);
      await getPopularData();
    }
  };

  useEffect(() => {
    // setTrending(getTrendingData());
    refreshHandler();
  }, [category]);
  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-24  w-full  flex items-center justify-between overflow-x-hidden">
        <h1 className="text-2xl font-semibold text-zinc-300">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
          ></i>
          Popular
        </h1>
        <div className="z-50">
          <Topnav />
        </div>

        <div className=" w-[30vw]">
          <div className="flex gap-5 justify-between ">
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
            {/* <Dropdown
              title="Duration"
              options={["day", "week"]}
              func={(e) => setDuration(e.target.value)}
            /> */}
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopularData}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
