"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderIcon from "@/_icons/HeaderIcon";
import Modes from "@/_icons/Modes";
// import GenreIcon from "@/_icons/GenreIcon";
// import SearchIcon from "@/_icons/SearchIcon";
import LinesIcon from "@/_icons/LinesIcon";
// import GenreButton from "@/_components/GenreButton";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchCard from "@/_components/SearchCard";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Header() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const getPopularData = async () => {
    const endpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data.genres);
  };
  useEffect(() => {
    getPopularData();
  }, []);

  const navigateToHomePage = () => {
    router.push("/");
  };

  return (
    <div
      className="h-[59px] w-full flex flex-row  items-center z-40"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className=" w-[1280px] h-full flex flex-row justify-between items-center  ">
        <HeaderIcon onClick={navigateToHomePage} />
        <div className="flex flex-row gap-12 items-center ">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup className=" flex flex-col">
                <SelectLabel>
                  {" "}
                  <p className="text-2xl"> Genres</p>
                  <p> See lists of movies by genre </p>
                </SelectLabel>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex w-full flex-wrap gap-2 grid grid-cols-5 ">
                    {data?.map((movie) => (
                      <Badge
                        key={movie.id}
                        className=" bg-white text-black border border-gray-300"
                      >
                        {movie.name} <LinesIcon />
                      </Badge>
                    ))}
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SearchCard />
        </div>
        <Modes />
      </div>
    </div>
  );
}
