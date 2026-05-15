"use client";

import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import StarIcon from "@/_icons/StarIcon";
import { Badge } from "@/components/ui/badge";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingMovieDetails from "@/_loading/LoadingMovieDetails";
import MovieCard from "./MovieCard";
import ButtonCard from "./ButtonCard";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const MovieDetailsCard = () => {
  const [movieData, setMoviedata] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [directorData, setDirectorData] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  const getData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const detailMovieEndpoint = `${BASE_URL}/movie/${id}?language=en-US`;
      const directorMovieEndpoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;
      const trailerVideoEndpoint = `${BASE_URL}/movie/${id}/videos?language=en-US`;
      const similarMovieEndpoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`;

      const [detailRes, similarRes, videoRes, directorRes] = await Promise.all([
        fetch(detailMovieEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        fetch(similarMovieEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        fetch(trailerVideoEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        fetch(directorMovieEndpoint, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      if (!detailRes.ok || !similarRes.ok || !videoRes.ok || !directorRes.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const detailData = await detailRes.json();
      const similarData = await similarRes.json();
      const videosData = await videoRes.json();
      const directorData = await directorRes.json();
      console.log("similarData", similarData);

      const trailerVideo = videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailer(trailerVideo ? trailerVideo.key : null);
      setMovieDetail(detailData);
      setMoviedata(similarData.results);
      setDirectorData(directorData);
    } catch (error) {
      console.error(error);
      setError("Failed to load movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);
  if (loading) {
    return (
      <div className="flex flex-col">
        <Header />
        <LoadingMovieDetails />
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="max-w-[1080px] mx-auto w-full px-4 sm:px-6 pt-10 pb-10">
          <div className="border border-border rounded-lg p-4 text-sm text-muted-foreground">
            {error}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const handleSeeMoreButton = () => {
    router.push(`/movie/${id}/morelikethis`);
  };

  const directors = directorData?.crew?.filter(
    (data) => data.job === "Director"
  );
  const writers = directorData?.crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "Story"
  );
  const stars = directorData?.cast
    ?.slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");

  console.log("Writers", writers);
  console.log("Stars", stars);
  console.log("movieData", movieData);
  console.log("movieDetail", movieDetail);
  console.log("directorData", directorData);

  const posterAltText = movieDetail?.title
    ? `${movieDetail.title} poster`
    : "Movie poster";
  const backdropAltText = movieDetail?.title
    ? `${movieDetail.title} backdrop`
    : "Movie backdrop";
  const displayRating =
    typeof movieDetail?.vote_average === "number"
      ? movieDetail.vote_average.toFixed(1)
      : "-";

  return (
    <div>
      <Header />
      <div className="max-w-[1080px] mx-auto w-full px-4 sm:px-6">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pt-[52px]">
            <div className="flex flex-col">
              <p className="text-2xl font-extrabold">{movieDetail?.title}</p>
              <p className="text-muted-foreground">
                {movieDetail?.release_date}{" "}
              </p>
            </div>
            <div className="flex flex-col sm:items-end">
              <p>Rating </p>
              <div className="flex flex-row">
                <StarIcon className=" " />
                <p className=" text-lg "> {displayRating} </p>

                <p className="text-lg text-muted-foreground ">/10</p>
              </div>
            </div>
          </div>
          {movieDetail && (
            <div className="flex flex-col lg:flex-row gap-6 pt-6">
              <Image
                src={
                  movieDetail.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                    : "/MoviePoster.png"
                }
                alt={posterAltText}
                width={290}
                height={428}
                className="rounded-lg w-full max-w-[290px]"
                sizes="(max-width: 1024px) 100vw, 290px"
              />
              <div className="w-full rounded-lg overflow-hidden bg-muted/30 border border-border aspect-video lg:aspect-auto lg:h-[428px]">
                {trailer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}`}
                    title={movieDetail?.title || "Movie trailer"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={
                      movieDetail.backdrop_path
                        ? `https://image.tmdb.org/t/p/w780${movieDetail.backdrop_path}`
                        : "/moviebg.png"
                    }
                    alt={backdropAltText}
                    width={760}
                    height={428}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <div className="pt-[32px] pb-[16px] flex flex-wrap gap-2">
              {movieDetail?.genres?.slice(0, 8).map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="bg-card text-foreground border-border px-4 py-2"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            <p className="pb-[20px]">{movieDetail?.overview}</p>
          </div>
          <table className="border-collapse w-full pt-[20px]">
            <tbody>
              <tr className="border-b border-border align-top">
                <th className="block sm:table-cell text-left pt-4 sm:py-4 pr-6 text-sm font-semibold sm:w-[140px]">
                  Director
                </th>
                <td className="block sm:table-cell pb-4 sm:py-4 text-sm text-muted-foreground">
                  {directors?.map((d) => d.name).join(", ") || "-"}
                </td>
              </tr>
              <tr className="border-b border-border align-top">
                <th className="block sm:table-cell text-left pt-4 sm:py-4 pr-6 text-sm font-semibold">
                  Writers
                </th>
                <td className="block sm:table-cell pb-4 sm:py-4 text-sm text-muted-foreground">
                  {writers?.map((w) => w.name).join(", ") || "-"}
                </td>
              </tr>
              <tr className="align-top">
                <th className="block sm:table-cell text-left pt-4 sm:py-4 pr-6 text-sm font-semibold">
                  Stars
                </th>
                <td className="block sm:table-cell pb-4 sm:py-4 text-sm text-muted-foreground">
                  {stars || "-"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row justify-between items-center">
            <p className="font-bold pb-[20px] pt-[20px] text-2xl">
              {" "}
              More like this
            </p>
            <ButtonCard
              className="flex justify-center items-center "
              onClick={handleSeeMoreButton}
            />
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 pb-[112px]">
            {movieData.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MovieDetailsCard;
