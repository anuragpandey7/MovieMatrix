import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncloadpeople,
  removepeople,
} from "../../store/actions/personActions";
import Loading from "../templat/Loading";
import HorizontalCards from "../templat/HorizontalCards";
import Dropdown from "../templat/Dropdown";
const PersonDetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  // console.log(pathname);

  const { info } = useSelector((state) => state.people);
  // console.log("ll", info);

  // console.log(id);

  useEffect(() => {
    dispatch(asyncloadpeople(id));

    return () => {
      dispatch(removepeople());
    };
  }, [id]);
  return info ? (
    // part1 navigation
    <div className="px-[10%] w-screen bg-[#1f1e24] h-[150vh]">
      <nav className=" h-[10vh] w-full text-zinc-100 flex gap-10 text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd]  font-medium pr-2"
        ></Link>
      </nav>

      {/* part 2 left poster and details */}
      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            className="transform transition-transform duration-300 hover:scale-[102%] shadow-[8px_18px_38px_2px_rgba(0,0,0,0.5)] cursor-pointer h-[37vh] w-[30vh] object-cover"
            src={`https://image.tmdb.org/t/p/w500${
              info.detail.profile_path || info.detail.poster_path
            }`}
          />
          <hr className="mt-7 mb-5 border-none h-[2px] bg-zinc-500" />

          {/* social link */}
          <div className="text-2xl text-white flex gap-x-5">
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
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-line"></i>
            </a>
            <a
              className="hover:scale-105"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-line"></i>
            </a>
            <a
              className="hover:scale-105"
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}/`}
            >
              <i class="ri-twitter-x-line"></i>
            </a>
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Information
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold  ">Known For</h1>
          <h1 className=" text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-2 ">Gender</h1>
          <h1 className=" text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2">Birthday</h1>
          <h1 className=" text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2 ">
            Deathday
          </h1>
          <h1 className=" text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2">
            Also Known as
          </h1>
          <h1 className=" text-zinc-400">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold mb-5 ">
            Biography
          </h1>
          <p className=" text-zinc-400">{info.detail.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-5 mb-5">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className=" text-zinc-400 mt-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.5)] border-2 border-zinc-800 p-6">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white mt-3 duration-200 cursor-pointer"
              >
                <Link to={`/${category}/detail/${c.id}`} className="">
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetail;
