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

import LinesIcon from "@/_icons/LinesIcon";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchCard from "@/_components/SearchCard";
import GenreButton from "@/_components/GenreButton";
import { useTheme } from "next-themes";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Header() {
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
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
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToHomePage = () => {
    router.push("/");
  };

  return (
    <div className="w-full flex justify-center items-center z-40 border-b border-border">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={navigateToHomePage}
            aria-label="Go to home"
            className="rounded-md hover:bg-accent/30 transition p-1 -m-1"
          >
            <HeaderIcon />
          </button>

          <button
            type="button"
            aria-label="Toggle dark mode"
            className="sm:hidden rounded-md bg-transparent text-foreground hover:bg-accent/30 transition p-1"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            disabled={!mounted}
          >
            <Modes />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch sm:items-center">
          <Select>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>

            <SelectContent className="max-h-[70vh] overflow-auto">
              <SelectGroup className="flex flex-col">
                <SelectLabel>
                  <p className="text-2xl">Genres</p>
                  <p className="text-sm text-muted-foreground">
                    See lists of movies by genre
                  </p>
                </SelectLabel>
                <div className="pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {data?.map((genre) => (
                      <GenreButton key={genre.id} id={genre.id} type={genre.name} />
                    ))}
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SearchCard />
        </div>

        <button
          type="button"
          aria-label="Toggle dark mode"
          className="hidden sm:inline-flex rounded-md bg-transparent text-foreground hover:bg-accent/30 transition p-1"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          disabled={!mounted}
        >
          <Modes />
        </button>
      </div>
    </div>
  );
}
