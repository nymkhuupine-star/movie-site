import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";

const MovieCard = ({
  rating,
  title,
  imageUrl,
  id,
  minimumWidth = undefined,
  className = "",
}) => {
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
      className={`bg-neutral-200 dark:bg-neutral-800 rounded-sm h-[439px] w-full cursor-pointer ${className}`}
      onClick={handleRouter}
      style={minimumWidth ? { minWidth: minimumWidth } : undefined}
    >
      <div
        style={{ backgroundImage: `url(${safeImageUrl})` }}
        className="h-[340px] bg-cover bg-center rounded-sm"
      ></div>
      <div className="flex flex-col">
        <div className="flex flex-row pt-[8px] pl-[8px] items-center">
          <StarIcon className="" />
          <p className="text-sm dark:text-neutral-200">{displayRating}</p>
          <p className="text-base text-neutral-400 dark:text-neutral-500">/10</p>
        </div>
        <div className="px-[8px] text-lg leading-snug dark:text-white line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
