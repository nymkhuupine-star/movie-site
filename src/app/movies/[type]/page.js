"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MovieCard from "@/_components/MovieCard";
import ButtonCard from "@/_components/ButtonCard";
import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import { LoadingMovieList } from "@/_loading/LoadingMovieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function MoviesType() {
  const param = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upcomingData, setPopularData] = useState([]);
  const getPopularData = useCallback(async () => {
    if (!param.type) return;
    setLoading(true);
    setError(null);
    const endpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=${page}`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setPopularData(data.results || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, param.type]);
  useEffect(() => {
    getPopularData();
  }, [getPopularData]);
  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Header />
        <LoadingMovieList />
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex justify-center  items-center flex-col">
      <Header />
      <div className="flex flex-col gap-8 w-full max-w-[1280px] px-4 sm:px-10 pt-10 pb-10">
        <div className=" flex flex-row justify-between">
          <p className="text-2xl sm:text-[34px] capitalize">{param.type}</p>
        </div>

        {error ? (
          <div className="border border-border rounded-lg p-4 text-sm text-muted-foreground">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 sm:gap-8">
            {upcomingData?.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                id={movie.id}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination className="flex justify-end w-full max-w-[1280px] px-4 sm:px-10 pb-[76px]">
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
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setPage((prev) => prev + 1)}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setPage((prev) => prev + 1)}
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
}
