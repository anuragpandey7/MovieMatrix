import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../assets/no-image.webp";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(null);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  // console.log(search);
  useEffect(() => {
    setSearch(null)
    if (query.length > 0) getSearches();
  }, [query]);
  
  return (
    <div className="w-[55vw] h-[14vh]   flex justify-start items-center ml-[8%] ">
      <i className=" text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search for movies"
        className="w-[70%] mx-3 p-3 rounded-full text-center outline-none text-sm border-none bg-transparent bg-zinc-700 text-white"
      />
      {query.length > 0 && (
        <i
          onClick={() => {
            setQuery("");
            setSearch(null);
          }}
          className="text-zinc-400 text-3xl  ri-close-fill"
        ></i>
      )}
      <div className=" text-zinc-300 absolute z-50 top-[10.5%] w-[38%] bg-zinc-800 max-h-[40vh] rounded-lg  ml-[3%] px-4 overflow-y-auto overflow-x-hidden ">
        {search &&
          search.map((el) => (
            <Link
              to={`/${el.media_type}/detail/${el.id}`}
              key={el.id}
              className=" flex items-center gap-10 px-5 border-b-[1px] border-zinc-700 hover:text-white hover:scale-[102%] hover:bg-700 duration-300"
            >
              <img
                className="w-[9vh] h-[9vh] rounded-full mt-2 mb-2 object-cover shadow-sm"
                src={
                  el.backdrop_path || el.poster_paths || el.profile_path
                    ? `https://image.tmdb.org/t/p/w500${
                        el.backdrop_path || el.poster_paths || el.profile_path
                      } `
                    : noimage
                }
              />
              <span>{el.original_name || el.original_title}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
