import Image from "next/image";
import Header from "@/_features/Header";
import Footer from "@/_features/Footer";
import HeroSection from "@/_features/home/HeroSection";
import { MovieList } from "@/_features/home/MovieList";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <HeroSection />
      <MovieList type="upcoming" />
      <MovieList type="popular" />
      <MovieList type="top_rated" />
      <Footer />
    </div>
  );
}
