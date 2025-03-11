export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendedtv = await axios.get(`/tv/${id}/recommendations`);
    const tvvideos = await axios.get(`/tv/${id}/videos`);
    const similartv = await axios.get(`/tv/${id}/similar`);
    const tvwatchproviders = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`);

    // console.log(detail)

    let originalData = {
      detail: detail.data,
      externalid: externalid.data,
      recommendedtv: recommendedtv.data.results,
      tvvideos: tvvideos.data.results.find((m) => m.type === "Trailer"),
      similartv: similartv.data.results,
      tvwatchproviders: tvwatchproviders.data.results.IN,
      translations: translations.data.translations.map((t) => t.english_name),
    };

    dispatch(loadtv(originalData));
    // console.log(originalData);
  } catch (error) {
    console.log("Error : ", error);
  }
};
