"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroSectionCard from "@/_components/HeroSectionCard";
import LoadingHeroList from "@/_loading/LoadingHeroList";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY ";

export const HeroSection = () => {
  const [movieData, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const upcomingMovieEndpoint = `${BASE_URL}/movie/popular?language=en-US&page=1`;
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
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading && movieData?.length === 0) {
    return <LoadingHeroList />;
  }
  return (
    <div className="w-full flex justify-center items-center">
      <Carousel className=" max-w-[1440px] h-[600px] flex items-center">
        <CarouselContent className="flex items-center ">
          {movieData?.slice(0, 5)?.map((movie, index) => (
            <CarouselItem key={movie.id}>
              <Card className=" max-w-[1440px] h-[600px]  ">
                <CardContent className="p-0  w-full h-full">
                  <HeroSectionCard
                    key={movie.id}
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    rating={movie.vote_average}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default HeroSection;
