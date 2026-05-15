"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MovieCard from "@/_components/MovieCard";
import { LoadingMovieList } from "@/_loading/LoadingMovieList";
import ButtonCard from "@/_components/ButtonCard";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = (props) => {
  const { type } = props;
  const { onClick } = props;
  const categoryNames = {
    upcoming: "Upcoming",
    popular: "Popular",
    top_rated: "Top Rated",
  };
  const router = useRouter();
  const [movieData, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const upcomingMovieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
      const response = await fetch(upcomingMovieEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMoviedata(data.results);
    } finally {
      setLoading(false);
    }
  }, [type]);
  useEffect(() => {
    getData();
  }, [getData]);
  if (loading) {
    return <LoadingMovieList />;
  }
  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };
  return (
  <div className="flex justify-center items-center w-full px-4 sm:px-10">
    <div className="flex flex-col gap-8 pt-10 w-full max-w-[1280px]">
      <div className="flex flex-row justify-between items-center gap-4">
        <p className="text-2xl sm:text-[34px]">{categoryNames[type]}</p>
        <ButtonCard
          onClick={handleSeeMoreButton}
          className="flex justify-center items-center"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 pb-12">
        {movieData.slice(0, 10).map((movie) => (
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
  </div>
);};

export default MovieList;
