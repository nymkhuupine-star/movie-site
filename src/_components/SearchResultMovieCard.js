import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";

const SearchResultMovieCard = ({ rating, title, imageUrl, id }) => {
  const router = useRouter();

  const handleRouter = () => {
    router.push(`/movie/${id}`);
  };

  const safeImageUrl =
    imageUrl && !String(imageUrl).includes("null") ? imageUrl : "/MoviePoster.png";
  const displayRating =
    typeof rating === "number" ? rating.toFixed(1) : rating ?? "-";

  return (
    <div
      className="bg-neutral-200 dark:bg-neutral-800 rounded-sm cursor-pointer w-full"
      onClick={handleRouter}
    >
      <div
        style={{ backgroundImage: `url(${safeImageUrl})` }}
        className="w-full aspect-[2/3] bg-cover bg-center rounded-sm"
      ></div>

      <div className="flex flex-col p-2">
        <div className="flex flex-row items-center gap-1">
          <StarIcon className="" />
          <p className="text-sm dark:text-neutral-200">{displayRating}</p>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">/10</p>
        </div>
        <div className="text-sm sm:text-base leading-snug dark:text-white line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
};
export default SearchResultMovieCard;
