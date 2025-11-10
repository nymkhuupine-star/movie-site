"use client";

import { useEffect, useState } from "react";
import SearchIcon from "@/_icons/SearchIcon";
import SearchMovieCard from "./SearchMovieCard";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const SearchCard = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      setSearchData([]);
      return;
    }
    const delay = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      router.push(`/search/${searchValue}`);
    }
  };

  const getData = async () => {
    if (!searchValue) return;
    setLoading(true);
    try {
      const searchMovieEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;

      const searchRes = await fetch(searchMovieEndpoint, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });

      const data = await searchRes.json();
      setSearchData(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-[379px] ">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-4 h-4" />
        </div>

        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchValue}
          className="border border-slate-300 w-[379px] h-[36px] rounded-xl outline-none pl-10 pr-4"
          placeholder="Search..."
        />

        {loading && <p className="text-sm text-gray-400 mt-2">Loading...</p>}

        {searchData.slice(0, 5).map((movie) => (
          <SearchMovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
