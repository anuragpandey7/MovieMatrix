import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../../store/actions/tvActions";
import Loading from "../templat/Loading";
import HorizontalCards from "../templat/HorizontalCards";
import Dropdown from "../templat/Dropdown";

const TvDetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(pathname);

  const { info } = useSelector((state) => state.tv);
  // console.log("tv", info);

  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w500${
          info.detail.backdrop_path || info.detail.poster_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-[210%] px-[10%] relative"
    >
      {/* part 1 nav */}

      <nav className="h-[10vh] w-full text-zinc-100 flex gap-10 text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
        ></Link>
        <a
          target="_blank"
          href={info.detail.homepage}
          className="hover:scale-105"
        >
          <i className=" ri-home-7-line"></i>
        </a>
        <a
          className="hover:scale-105"
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:scale-105 ri-global-line"></i>
        </a>

        <a
          className="hover:scale-105"
          target="_blank"
          href={`https://www.imdb.com/title/${info.detail.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* poster and navigation */}

      <div className="w-full flex mt-10  mb-14">
        <img
          className="transform transition-transform duration-300 hover:scale-[102%] shadow-[8px_18px_38px_2px_rgba(0,0,0,0.5)] h-[45vh] w-[35vh] object-cover"
          src={`https://image.tmdb.org/t/p/w500${
            info.detail.backdrop_path || info.detail.poster_path
          }`}
        />
        <div className="content ml-[7%] text-white">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.title ||
              info.detail.original_title}
            <small className="font-bold text-zinc-300 text-2xl">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex  items-center gap-x-3 my-5 ">
            <span className=" rounded-full text-gray-100 h-[7vh] w-[7vh] font-semibold text-xl flex items-center justify-center bg-yellow-600">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[10%] leading-7">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1> {info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="font-semibold text-xl text-zinc-100 italic">
            {info.detail.tagline}
          </h1>
          <h1 className="font-semibold text-xl text-zinc-200 mt-5">Overview</h1>
          <p className="mt-3">{info.detail.overview}</p>

          <h1 className="font-semibold text-xl text-zinc-200 mt-5">
            Movie Translated
          </h1>
          <p className="mt-3 mb-8">{info.translations.join(", ")}</p>

          <Link
            className="px-8 py-3 bg-[#6556CD] rounded-xl shadow-sm border w-[15vw] text-center hover:scale-[102%]"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-1"></i>
            Watch Trailer
          </Link>
        </div>
      </div>

      {/* <Dropdown title={"Season"} options={[...info.detail.seasons]} /> */}
      {/* part 3 platform */}
      <div className=" absolute top-[30%] w-[20%] flex flex-col gap-y-5 mb-2">
        {info.tvwatchproviders && info.tvwatchproviders.flatrate && (
          <div className="flex gap-5 mt-5 items-center">
            <h1 className="text-white"> Platform - </h1>
            {info.tvwatchproviders.flatrate.map((wp, i) => (
              <img
                title={wp.provider_name}
                key={i}
                className="hover:scale-[102%] w-[5vh] h-[5vh] rounded-lg object-cover"
                src={`https://image.tmdb.org/t/p/w500${wp.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.tvwatchproviders && info.tvwatchproviders.rent && (
          <div className="flex gap-5 items-center">
            <h1 className="text-white"> Rent -</h1>
            {info.tvwatchproviders.rent.map((wp, i) => (
              <img
                title={wp.provider_name}
                key={i}
                className="hover:scale-[102%] w-[5vh] h-[5vh] rounded-lg object-cover"
                src={`https://image.tmdb.org/t/p/w500${wp.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.tvwatchproviders && info.tvwatchproviders.buy && (
          <div className="flex  gap-5 items-center">
            <h1 className="text-white">Buy- </h1>
            {info.tvwatchproviders.buy.map((wp, i) => (
              <img
                title={wp.provider_name}
                key={i}
                className="hover:scale-[102%] w-[5vh] h-[5vh] rounded-lg object-cover"
                src={`https://image.tmdb.org/t/p/w500${wp.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* recommendation */}
      <br />

      <h1 className="text-white text-2xl font-semibold underline ml-9">
        Seasons{" "}
      </h1>
      <div className="w-[100%] flex  overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 &&
          info.detail.seasons.map((sea, i) => (
            <div className="w-[30vh] m-3 " key={i}>
              <img
                className="transform transition-transform duration-300 hover:scale-105 shadow-[8px_18px_38px_2px_rgba(0,0,0,0.5)] h-[35vh] min-w-[14vw] object-cover"
                src={`https://image.tmdb.org/t/p/w500${
                  sea.backdrop_path || sea.profile_path || sea.poster_path
                }`}
              />
              <h1 className="text-xl mt-3 text-zinc-400 font-normal">
                {sea.name}
              </h1>
            </div>
          ))}
      </div>

      <h1 className="text-white text-2xl font-semibold underline mb-5">
        Recommendation and Similar Content{" "}
      </h1>
      <HorizontalCards
        data={
          info.recommendedtv.length > 0 ? info.recommendedtv : info.similartv
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetail;
