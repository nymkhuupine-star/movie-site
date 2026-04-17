"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      setIsOpen(false);
      router.push(`/search/${searchValue}`);
    }
  };

  const getData = useCallback(async () => {
    if (!searchValue) return;
    setLoading(true);
    try {
      const searchMovieEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;
      const searchRes = await fetch(searchMovieEndpoint, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await searchRes.json();
      setSearchData(data.results || []);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setSearchData([]);
      setIsOpen(false);
      return;
    }
    const delay = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue, getData]);

  return (
    <div ref={containerRef} className="relative w-[379px]">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        <SearchIcon className="text-gray-500 dark:text-white w-4 h-4" />
      </div>

      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => searchData.length > 0 && setIsOpen(true)}
        value={searchValue}
        className="border border-slate-300 w-[379px] h-[36px] rounded-xl outline-none pl-10 pr-4"
        placeholder="Search..."
      />

      {isOpen && (
        <div className="absolute top-[40px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {loading ? (
            <p className="text-sm text-muted-foreground p-3">Loading...</p>
          ) : (
            searchData
              .slice(0, 5)
              .map((movie) => (
                <SearchMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                  onClick={() => setIsOpen(false)}
                />
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCard;
