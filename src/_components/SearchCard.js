"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@/_icons/SearchIcon";
import SearchMovieCard from "./SearchMovieCard";
import { useRouter } from "next/navigation";
import LineIcon from "@/_icons/LineIcon";

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
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const getData = useCallback(async () => {
    if (!searchValue.trim()) return;
    setLoading(true);
    try {
      const query = encodeURIComponent(searchValue.trim());
      const searchMovieEndpoint = `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1`;
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
    if (!searchValue.trim()) {
      setSearchData([]);
      setIsOpen(false);
      return;
    }
    const delay = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue, getData]);

  const handleSeeAll = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/search/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full sm:w-[379px]">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        <SearchIcon className="text-gray-500 dark:text-white w-4 h-4" />
      </div>

      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => searchValue.trim() !== "" && setIsOpen(true)}
        value={searchValue}
        className="border border-border bg-background text-foreground w-full h-[36px] rounded-xl outline-none pl-10 pr-4"
        placeholder="Search..."
      />

      {isOpen && (
        <div className="absolute top-[40px] left-0 w-full bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div
                aria-label="Loading"
                className="size-5 rounded-full border-2 border-border border-t-transparent animate-spin"
              />
            </div>
          ) : searchData.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            <div>
              {searchData.slice(0, 4).map((movie) => (
                <SearchMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                  onClick={() => setIsOpen(false)}
                />
              ))}

              <div className="border-t border-border">
                <button
                  type="button"
                  onClick={handleSeeAll}
                  className="w-full py-3 px-4 text-sm text-muted-foreground hover:bg-accent transition flex items-center justify-center gap-2"
                >
                  <span>
                    See all results for &ldquo;{searchValue.trim()}&rdquo;
                  </span>
                  <LineIcon className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCard;
