"use client";

import SearchResultMovieCard from "@/_components/SearchResultMovieCard";
import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import LinesIcon from "@/_icons/LinesIcon";
import SearchPipe from "@/_icons/SearchPipe";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LoadingMovieList } from "@/_loading/LoadingMovieList";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const SearchQuery = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { value } = useParams();

  const getData = useCallback(async () => {
    if (!value) return;
    setLoading(true);
    setError(null);
    try {
      const query = encodeURIComponent(String(value || ""));
      const movieEndpoint = `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`;
      const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;

      const [movieRes, genreRes] = await Promise.all([
        fetch(movieEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        fetch(genreEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      if (!movieRes.ok || !genreRes.ok) {
        throw new Error("Failed to fetch search results");
      }

      const genreData = await genreRes.json();
      const movieData = await movieRes.json();

      setData(genreData.genres || []);
      setMovieData(movieData.results || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load search results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, value]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading && movieData.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <Header />
        <LoadingMovieList />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center ">
      <Header />
      <div className="w-full max-w-[1280px] px-4 sm:px-6 justify-center">
        <div className=" ">
          <p className="text-3xl pt-[52px]"> Search results</p>
          <p className="text-xl pt-[32px] pb-[32px]">
            {movieData.length} results for &ldquo;{decodeURIComponent(value || "")}&rdquo;
          </p>
        </div>
        {error ? (
          <div className="border border-border rounded-lg p-4 text-sm text-muted-foreground">
            {error}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8">
                {movieData.map((movie) => (
                  <SearchResultMovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                  />
                ))}
              </div>

              <Pagination className="flex justify-end pt-10 pb-20 text-neutral-400">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => Math.max(prev - 1, 1));
                      }}
                      className={page === 1 ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      onClick={(e) => e.preventDefault()}
                      className="cursor-default"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => prev + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <SearchPipe className="hidden lg:block shrink-0 text-border" />

            <div className="flex flex-col gap-6 lg:gap-12 lg:w-[320px] lg:pl-2">
              <div className="flex flex-col gap-2">
                <p className="text-2xl">Genres</p>
                <p className="text-sm text-muted-foreground">
                  See lists of movies by genre
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data?.slice(0, 20).map((genre) => (
                  <Badge
                    key={genre.id}
                    className="bg-card text-foreground border border-border"
                    variant="outline"
                  >
                    {genre.name} <LinesIcon />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchQuery;
