import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../templat/Cards";
import Loading from "../templat/Loading";
import Dropdown from "../templat/Dropdown";
import Topnav from "../templat/Topnav";

const People = () => {
  const [category, setCategory] = useState("popular");
  //   const [duration, setDuration] = useState("day");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "MovieMatrix | People ";

  const navigate = useNavigate();

  const getPeopleData = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Header Error : " + error);
    }
  };

  const refreshHandler = async () => {
    if (people.length === 0) {
      getPeopleData();
    } else {
      setPage(1);
      setPeople([]);
      await getPeopleData();
    }
  };

  useEffect(() => {
    // setTrending(getTrendingData());
    refreshHandler();
  }, [category]);
  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-24  w-full  flex items-center  overflow-x-hidden">
        <h1 className="  text-2xl font-semibold text-zinc-300">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
          ></i>
          People <small className="ml-3 text-sm text-zinc-500">({category})</small>
        </h1>
        <div className="z-50">
          <Topnav />
        </div>

      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeopleData}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
