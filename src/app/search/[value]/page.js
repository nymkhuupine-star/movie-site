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

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const SearchQuery = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { value } = useParams();

  const getData = useCallback(async () => {
    if (!value) return;
    setLoading(true);
    try {
      const movieEndpoint = `${BASE_URL}/search/movie?query=${value}&language=en-US&page=${page}`;
      const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;

      const [movieRes, genreRes] = await Promise.all([
        fetch(movieEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        fetch(genreEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      const genreData = await genreRes.json();
      const movieData = await movieRes.json();

      setData(genreData.genres || []);
      setMovieData(movieData.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, value]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col items-center ">
      <Header />
      <div className=" w-[1280px] justify-center ">
        <div className=" ">
          <p className="text-3xl pt-[52px]"> Search results</p>
          <p className="text-xl pt-[32px] pb-[32px]">
            {movieData.length} results for &ldquo;{decodeURIComponent(value || "")}&rdquo;
          </p>
        </div>
        <div className="flex flex-row   w-[1280px]">
          <div className=" flex flex-col">
            <div className="w-full flex  gap-[32px] grid grid-cols-4">
              {movieData.map((movie) => (
                <SearchResultMovieCard
                  minimumWidth="190px"
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                />
              ))}
            </div>
            <div>
              <Pagination className=" pl-[600px] pb-[344px] text-neutral-400   ">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      <Badge className="  border-neutral-200 bg-white  text-neutral-400 ">
                        {page}
                      </Badge>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setPage((prev) => prev + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          <SearchPipe />
          <div className="flex flex-col gap-12 items-center  pl-[22px] max-w-[1440px]">
            <div className="flex flex-col gap-2">
              <p className="text-2xl"> Genres</p>
              <p> See lists of movies by genre </p>
            </div>
            <div className="flex flex-col items-center gap-[5px]">
              <div className="flex w-full flex-wrap gap-[5px] grid grid-cols-3 ">
                {data?.slice(0, 20).map((movie) => (
                  <Badge
                    key={movie.id}
                    className=" bg-white text-black border border-gray-300 "
                  >
                    {movie.name} <LinesIcon />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchQuery;
