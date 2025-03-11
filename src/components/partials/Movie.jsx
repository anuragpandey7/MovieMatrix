import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../templat/Cards";
import Loading from "../templat/Loading";
import Dropdown from "../templat/Dropdown";
import Topnav from "../templat/Topnav";

const Movie = () => {
  const [category, setCategory] = useState("now_playing");
  //   const [duration, setDuration] = useState("day");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "MovieMatrix | Movies ";

  const navigate = useNavigate();

  const getMovieData = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  const refreshHandler = async () => {
    if (movie.length === 0) {
      getMovieData();
    } else {
      setPage(1);
      setMovie([]);
      await getMovieData();
    }
  };

  useEffect(() => {
    // setTrending(getTrendingData());
    refreshHandler();
  }, [category]);
  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-24  w-full  flex items-center justify-between overflow-x-hidden">
        <h1 className=" flex items-center text-2xl font-semibold text-zinc-300">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
          ></i>
          Movie  <small className="ml-3 text-sm text-zinc-500">({category})</small>
        </h1>
        <div className="z-50">
          <Topnav />
        </div>

        <div className=" w-[30vw]">
          <div className="flex gap-5 justify-between ">
            <Dropdown
              title="Category"
              options={["popular", "now_playing", "top_rated", "upcoming"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={getMovieData}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
