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
  const [upcomingData, setPopularData] = useState([]);
  const getPopularData = useCallback(async () => {
    const endpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=${page}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPopularData(data.results || []);
  }, [page, param.type]);
  useEffect(() => {
    getPopularData();
  }, [getPopularData]);
  if (loading) {
    return <LoadingMovieList />;
  }
  const endpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=${page}`;

  return (
    <div className="flex justify-center  items-center flex-col">
      <Header />
      <div className="flex flex-col gap-[32px] px-10 pt-[40px] pb-[36px] max-w-[1440px] ">
        <div className=" flex flex-row justify-between">
          <p className="[font-size:34px]"> {param.type}</p>
        </div>

        <div className="flex flex-row  grid grid-cols-5 w-full gap-[32px] ">
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
      </div>
      <Pagination className="flex justify-end max-w-[1300px] pb-[76px]">
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
