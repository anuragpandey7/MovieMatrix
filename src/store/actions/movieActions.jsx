export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendedmovie = await axios.get(`/movie/${id}/recommendations`);
    const movievideos = await axios.get(`/movie/${id}/videos`);
    const similarmovie = await axios.get(`/movie/${id}/similar`);
    const moviewatchproviders = await axios.get(`/movie/${id}/watch/providers`);
    const translations = await axios.get(`/movie/${id}/translations`);

    let originalData = {
      detail: detail.data,
      externalid: externalid.data,
      recommendedmovie: recommendedmovie.data.results,
      movievideos: movievideos.data.results.find((m) => m.type === "Trailer"),
      similarmovie: similarmovie.data.results,
      moviewatchproviders: moviewatchproviders.data.results.IN,
      translations: translations.data.translations.map((t) => t.english_name)
    };

    dispatch(loadmovie(originalData));
    // console.log(originalData)
  } catch (error) {
    console.log("Error : ", error);
  }
};
