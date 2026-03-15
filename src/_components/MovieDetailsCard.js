"use client";

import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import StarIcon from "@/_icons/StarIcon";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoadingMovieList } from "@/_loading/LoadingMovieList";
import MovieCard from "./MovieCard";
import ButtonCard from "./ButtonCard";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const MovieDetailsCard = ({ rating, className }) => {
  const [movieData, setMoviedata] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [directorData, setDirectorData] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const getData = async () => {
    if (!id) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  if (loading) {
    return <LoadingMovieList />;
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

  return (
    <div>
      <Header />
      <div className=" max-w-[1080px] mx-auto w-full ">
        <div className="max-w-[1080px] w-full ">
          <div className="flex flex-row  justity-center justify-between  ">
            <div className="flex flex-col pt-[52px] ">
              <p className="text-2xl font-extrabold">{movieDetail.title}</p>
              <p className="text-muted-foreground">{movieDetail.release_date} </p>
            </div>
            <div className=" flex flex-col pt-[52px] ">
              <p>Rating </p>
              <div className="flex flex-row">
                <StarIcon className=" " />
                <p className=" text-lg "> {rating} </p>

                <p className="text-lg text-muted-foreground ">/10</p>
              </div>
            </div>
          </div>
          {movieDetail && (
            <div className="flex flex-row justify-between items-center w-full ">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                alt={movieDetail.title}
                className="w-[290px] h-[428px] rounded-lg"
              />
              {trailer ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title={movieDetail.title}
                  className="w-[760px] h-[428px] rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w780${movieDetail.backdrop_path}`}
                  alt={movieDetail.title}
                  className="w-[760px] h-[428px] rounded-lg"
                />
              )}
            </div>
          )}

          <div className="flex flex-col gap-2  max-w-[1300px] w-full">
            <div className="pt-[32px] pb-[32px] flex flex-wrap gap-2">
              {movieData?.slice(0, 5).map((movie) => (
                <Badge
                  key={movie.id}
                  variant="outline"
                  className="bg-card text-foreground border-border px-4 py-2"
                >
                  {movie.title}
                </Badge>
              ))}
            </div>
            <p className="pb-[20px]">{movieDetail.overview}</p>
          </div>
          <table className="border-collapse w-full max-w-[1300px] pt-[20px]">
            <tbody>
              <tr className="border-b border-border">
                <th className="text-left p-2">Director</th>
                <td className="p-2">
                  {directors?.map((d) => d.name).join(",")}
                </td>
              </tr>
              <tr className="border-b border-border">
                <th className="text-left p-2">Writers</th>
                <td className="p-2">
                  {" "}
                  {writers?.map((w) => w.name).join(",")}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2">Stars</th>
                <td className="p-2">{stars}</td>
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
          <div className="w-full flex gap-[32px] pb-[112px]  ">
            {movieData.slice(0, 5).map((movie) => (
              <MovieCard
                minimumWidth="190px"
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
