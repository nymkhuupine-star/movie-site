import LoadingMovieCard from "./LoadingMovieCard";

export const LoadingMovieList = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-8 w-full max-w-[1280px] px-4 sm:px-10 pt-10 pb-10">
        <div className="flex flex-row justify-between gap-4">
          <div className="bg-muted/80 animate-pulse rounded-sm w-[220px] sm:w-[250px] h-[32px]"></div>
          <div className="bg-muted/80 animate-pulse rounded-sm w-[140px] sm:w-[165px] h-[36px]"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 sm:gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <LoadingMovieCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
