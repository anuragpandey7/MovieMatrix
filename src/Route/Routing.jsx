import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Trending from "../components/partials/Trending";
import Popular from "../components/partials/Popular";
import Movie from "../components/partials/Movie";
import TvShows from "../components/partials/TvShows";
import People from "../components/partials/People";
import MovieDetail from "../components/partials/MovieDetail";
import TvDetail from "../components/partials/TvDetail";
import PersonDetail from "../components/partials/PersonDetail";
import Trailer from "../components/partials/Trailer";
import NotFound from "../components/templat/NotFound";
const Routing = () => {
  return (
    <>
      {/* <Link to={"/"}>Home</Link> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/detail/:id" element={<MovieDetail />}>
          <Route path="/movie/detail/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/detail/:id" element={<TvDetail />}>
          <Route path="/tv/detail/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<People />} />
        <Route path="/people/detail/:id" element={<PersonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routing;
