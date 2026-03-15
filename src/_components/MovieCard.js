import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";

const MovieCard = ({
  rating,
  title,
  imageUrl,
  id,
  minimumWidth,
  className,
}) => {
  const router = useRouter();

  const handleRouter = () => {
    router.push(`/movie/${id}`);
  };

  const getMinimumWidth = minimumWidth || "229px";

  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 rounded-sm h-[439px] flex-1 cursor-pointer`}
      onClick={handleRouter}
    >
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="h-[340px] bg-cover bg-center rounded-sm"
      ></div>
      <div className="flex flex-col">
        <div className="flex flex-row pt-[8px] pl-[8px] items-center">
          <StarIcon className="" />
          <p className="text-sm dark:text-neutral-200">{rating}</p>
          <p className="text-base text-neutral-400 dark:text-neutral-500">/10</p>
        </div>
        <div className="pl-[8px] text-lg leading-snug dark:text-white">{title}</div>
      </div>
    </div>
  );
};

export default MovieCard;