"use client";

import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import LoadingMovieCard from "@/_loading/LoadingMovieCard";
import MovieCard from "@/_components/MovieCard";
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

export default function MoreLikeThisPage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSimilarMovies = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=${page}`;
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await res.json();
      setMovies(data.results || []);
      setTotalResults(data.total_results || 0);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, page]);

  useEffect(() => {
    setPage(1);
  }, [id]);

  useEffect(() => {
    fetchSimilarMovies();
  }, [fetchSimilarMovies]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[1280px] px-4 sm:px-10 pt-[52px] pb-[80px]">
        <div className="flex items-baseline justify-between gap-4 pb-[32px]">
          <p className="text-3xl">More like this</p>
          <p className="text-sm text-muted-foreground">
            {totalResults} titles
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 pb-[36px]">
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingMovieCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 pb-[36px]">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
              />
            ))}
          </div>
        )}

        <Pagination className="flex justify-end pb-[76px]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {getPageNumbers().map((p, i) => {
              if (p === "...") {
                return (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    onClick={() => setPage(p)}
                    isActive={page === p}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className={
                  page === totalPages ? "pointer-events-none opacity-40" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}
