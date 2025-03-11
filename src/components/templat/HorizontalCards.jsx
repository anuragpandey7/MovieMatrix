import { Link } from "react-router-dom";

const HorizontalCards = ({ data}) => {
  // console.log("HC", data)
  return data.length > 0 ? (
    <div className="w-[100%] flex overflow-x-auto ">
      {data.map((el, i) => (
        <Link
          to={`/${el.media_type}/detail/${el.id}`}
          key={i}
          className="relative bg-zinc-800 mr-4 min-w-[18%] mb-5 cursor-pointer"
        >
          <i className="absolute text-gray-500 opacity-50 top-[25%] text-5xl ri-play-circle-fill"></i>
          <img
            className=" w-full h-[18vh] object-cover object-center "
            // src={`https://image.tmdb.org/t/p/w500${
            //   el.backdrop_path || el.profile_path || el.backdrop_path
            // }`}

            src={
              el.backdrop_path || el.profile_path || el.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${
                    el.backdrop_path || el.profile_path || el.backdrop_path
                  }`
                : "https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149279002.jpg?ga=GA1.1.719911894.1741673464&semt=ais_hybrid"
            }
          />
          <div className="text-gray-100 p-3">
            <h1 className=" w-full mt-3 text-xl font-black leading-none ">
              {el.name || el.original_name || el.title || el.original_title}
            </h1>
            <p className="w-full mt-3 text-base">
              {el.overview.slice(0, 70)}{" "}
              <span className="text-blue-700">more...</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <h1 className="text-3xl ">Nothing to Show</h1>
  );
};

export default HorizontalCards;
