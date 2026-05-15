import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";
import ButtonCard from "./ButtonCard";
import SearchLineIcon from "@/_icons/SearchLineIcon";

const SearchMovieCard = ({
  rating,
  title,
  imageUrl,
  id,
  releaseDate,
  onClick,
}) => {
  const router = useRouter();

  const handleRouter = () => {
    onClick?.();
    router.push(`/movie/${id}`);
  };

  const safeImageUrl =
    imageUrl && !String(imageUrl).includes("null") ? imageUrl : "/MoviePoster.png";
  const year = releaseDate ? String(releaseDate).slice(0, 4) : "";
  const displayRating =
    typeof rating === "number" ? rating.toFixed(1) : rating ?? "-";

  return (
    <div className="bg-background w-full">
      <div
        className="bg-background rounded-sm h-[116px] flex flex-row w-full items-center px-4"
        onClick={handleRouter}
      >
        <div
          style={{ backgroundImage: `url(${safeImageUrl})` }}
          className="h-[100px] w-[67px] bg-cover bg-center rounded-sm"
        ></div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex flex-row items-center pl-3">
              <StarIcon className=" " />
              <p className="text-sm ">{displayRating}</p>
              <p className="text-base text-neutral-400 ">/10</p>
            </div>
            <div className="pl-3 text-base leading-snug truncate">{title}</div>
          </div>

          <div className="flex flex-row items-center justify-between gap-3 pt-1 pl-3 pr-1">
            <p className="text-sm text-muted-foreground">{year}</p>
            <ButtonCard className="text-xs" />
          </div>
        </div>
      </div>
      <SearchLineIcon className="text-border" />
      {/* <p> See all results for "Wicked"</p> */}
    </div>
  );
};
export default SearchMovieCard;
