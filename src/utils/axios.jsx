import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWQ2MTY0M2MyNTU0N2Y3NDQ2NTBkNTIyMTYzNDc4YiIsIm5iZiI6MTY5NDUwNjAwNC40Mywic3ViIjoiNjUwMDFjMTRmZmM5ZGUwZWRmNjBiOWMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Fs6rfOC1GroMWCVwV7u83SA0_Oyb12YltkHC9r44erc",
  },
});

export default instance;
