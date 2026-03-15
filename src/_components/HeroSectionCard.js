"use client";

import StarIcon from "@/_icons/StarIcon";
import PlayIcon from "@/_icons/PlayIcon";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const HeroSectionCard = ({ movieId, title, rating, description, imageUrl }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTrailerKey(null);
    setIsOpen(false);
    setTrailerError("");
  }, [movieId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openTrailer = async () => {
    if (!movieId) return;
    if (trailerKey) {
      setIsOpen(true);
      return;
    }
    setLoadingTrailer(true);
    setTrailerError("");
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }
      );
      const data = await res.json();
      const videos = data?.results || [];
      const pickVideo = (types) =>
        videos.find((v) => v.site === "YouTube" && types.includes(v.type));
      const trailer =
        pickVideo(["Trailer"]) ||
        pickVideo(["Teaser"]) ||
        pickVideo(["Clip", "Featurette", "Behind the Scenes"]) ||
        videos.find((v) => v.site === "YouTube");

      if (trailer?.key) {
        setTrailerKey(trailer.key);
        setIsOpen(true);
      } else {
        setTrailerError("Trailer not available for this movie.");
        setIsOpen(true);
      }
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeTrailer = () => {
    setIsOpen(false);
    setTrailerError("");
  };

  return (
    <div className="flex items-center">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="w-full h-[600px] max-w-[1440px] bg-cover bg-center flex items-end rounded-sm"
      >
        {/* Gradient overlay */}
        <div className="w-full h-full flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-sm">
          <div className="flex flex-col pb-[60px] pl-[60px] gap-2">
            <p className="text-white text-sm font-medium">Now Playing:</p>
            <p className="text-white text-5xl font-bold">{title}</p>

            <div className="flex flex-row items-center gap-1">
              <StarIcon />
              <p className="text-white text-base font-semibold">{rating}</p>
              <p className="text-neutral-300 text-base">/10</p>
            </div>

            <p className="text-white w-[302px] text-sm leading-relaxed opacity-90">
              {description ||
                "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads."}
            </p>

            <button
              type="button"
              onClick={openTrailer}
              className="bg-white border border-slate-300 w-[155px] h-[40px] flex items-center justify-center gap-2 mt-4 rounded-lg hover:bg-slate-100 transition"
            >
              <PlayIcon className="text-black" />
              <span className="text-black text-sm font-medium">
                {loadingTrailer ? "Loading..." : "Watch Trailer"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && mounted
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="relative w-full max-w-[960px] aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                <button
                  type="button"
                  onClick={closeTrailer}
                  className="absolute top-3 right-3 z-10 rounded-full bg-black/70 text-white px-3 py-1 text-sm"
                  aria-label="Close trailer"
                >
                  Close
                </button>
                {trailerKey ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title={`${title} trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-base">
                    {trailerError || "Trailer not available."}
                  </div>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default HeroSectionCard;
