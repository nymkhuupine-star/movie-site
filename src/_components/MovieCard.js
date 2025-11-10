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
  console.log("minimumWidth", minimumWidth);
  const getMinimumWidth = minimumWidth || "229px";
  return (
    <div
      className={`bg-neutral-200 rounded-sm h-[439px] flex-1`}
      onClick={handleRouter}
    >
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="h-[340px] bg-cover bg-center rounded-sm"
      ></div>
      <div className="flex flex-col ">
        <div className="flex flex-row pt-[8px] pl-[8px] items-center">
          <StarIcon className=" " />
          <p className="text-sm ">{rating}</p>
          <p className="text-base text-neutral-400 ">/10</p>
        </div>
        <div className="pl-[8px] text-lg leading-snug "> {title}</div>
      </div>
    </div>
  );
};
export default MovieCard;
