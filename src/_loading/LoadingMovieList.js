import LoadingMovieCard from "./LoadingMovieCard";

export const LoadingMovieList = () => {
  return (
    <div className="flex justify-center gap-[32px]  ">
      <div className="flex flex-col gap-[32px] px-10 pt-[45px] pb-[36px] max-w-[1440px] ">
        <div className=" flex flex-row justify-between ">
          <div className="bg-muted/80 animate-pulse rounded-sm w-[250px] h-[32px]"></div>
          <div className="bg-muted/80 animate-pulse rounded-sm w-[165px] h-[36px]"></div>
        </div>

        <div className="flex flex-row  grid grid-cols-5 w-full gap-[32px] ">
          {Array.from({ length: 10 }).map((_, index) => (
            <LoadingMovieCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
