"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/_features/Header";
import Footer from "@/_features/Footer";
import MovieCard from "@/_components/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type RouteParams = { id: string };

const GenrePage = () => {
  const { id } = useParams<RouteParams>();
  const genreId = id;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (!selectedGenres.length) return;
    setLoading(true);
    try {
      const genreQuery = selectedGenres.join(",");
      const endpoint = `${BASE_URL}/discover/movie?language=en-US&with_genres=${genreQuery}&page=${page}`;
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
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchGenres(); }, []);
  useEffect(() => { fetchMovies(); }, [selectedGenres, page]);
  useEffect(() => {
    if (genreId) {
      setPage(1);
      setSelectedGenres([String(genreId)]);
    }
  }, [genreId]);

  const toggleGenre = (genreId: number) => {
    setPage(1);
    setSelectedGenres((prev) =>
      prev.includes(String(genreId))
        ? prev.filter((g) => g !== String(genreId))
        : [...prev, String(genreId)]
    );
  };

  const selectedGenreNames = genres
    .filter((g) => selectedGenres.includes(String(g.id)))
    .map((g) => g.name)
    .join(", ");

  // Pagination page numbers
  const getPageNumbers = (): Array<number | "..."> => {
    const pages: Array<number | "..."> = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[1100px] px-6 pt-[40px] pb-[80px]">
        <p className="text-2xl font-semibold pb-[24px]">Search filter</p>

        <div className="flex flex-row gap-[28px]">
          {/* Left - Genres */}
          <div className="w-[210px] flex-shrink-0">
            <p className="text-sm font-semibold pb-1">Genres</p>
            <p className="text-xs text-muted-foreground pb-3">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`flex items-center gap-1 border rounded-full px-2.5 py-1 text-[11px] leading-none transition ${
                    selectedGenres.includes(String(genre.id))
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border hover:bg-accent"
                  }`}
                >
                  {genre.name}
                  {selectedGenres.includes(String(genre.id)) ? " x" : " >"}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Movies */}
          <div className="flex flex-col flex-1 border-l border-border pl-6">
            <p className="text-sm pb-[16px]">
              {totalResults} titles in "{selectedGenreNames}"
            </p>

            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="grid grid-cols-4 gap-5">
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

            {/* Pagination */}
            <Pagination className="pt-[40px]">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
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
                  const pageNumber = p;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setPage(pageNumber)}
                        isActive={page === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenrePage;
