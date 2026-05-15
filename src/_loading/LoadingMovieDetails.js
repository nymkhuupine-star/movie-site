import LoadingMovieCard from "./LoadingMovieCard";

export default function LoadingMovieDetails() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1080px] px-4 sm:px-6 pt-10 pb-12">
        <div className="flex items-start justify-between gap-6 pb-6">
          <div className="flex flex-col gap-3 flex-1">
            <div className="bg-muted/80 animate-pulse rounded-sm h-8 w-2/3 max-w-[420px]" />
            <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-40" />
          </div>
          <div className="hidden sm:flex flex-col gap-2 items-end">
            <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-16" />
            <div className="bg-muted/80 animate-pulse rounded-sm h-6 w-20" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pb-8">
          <div className="bg-muted/80 animate-pulse rounded-lg w-full lg:w-[290px] h-[428px]" />
          <div className="bg-muted/80 animate-pulse rounded-lg w-full aspect-video lg:aspect-auto lg:h-[428px]" />
        </div>

        <div className="flex flex-wrap gap-2 pb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/80 animate-pulse rounded-full h-8 w-28"
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 pb-8">
          <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-full" />
          <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-11/12" />
          <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-10/12" />
        </div>

        <div className="border border-border rounded-lg overflow-hidden mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-6 px-4 py-3 ${
                i < 2 ? "border-b border-border" : ""
              }`}
            >
              <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-24" />
              <div className="bg-muted/80 animate-pulse rounded-sm h-4 w-2/3 max-w-[520px]" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pb-4">
          <div className="bg-muted/80 animate-pulse rounded-sm h-7 w-40" />
          <div className="bg-muted/80 animate-pulse rounded-sm h-9 w-28" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadingMovieCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

