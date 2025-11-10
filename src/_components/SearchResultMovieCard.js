import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";
import ButtonCard from "./ButtonCard";
import SearchLineIcon from "@/_icons/SearchLineIcon";

const SearchResultMovieCard = ({ rating, title, imageUrl, id }) => {
  const router = useRouter();

  const handleRouter = () => {
    router.push(`/movie/${id}`);
  };
  return (
    <div className=" w-[165px] h-[331px]">
      <div
        className={`bg-neutral-200 rounded-sm h-[331px] flex flex-col w-[165px]`}
        onClick={handleRouter}
      >
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="h-[244px] w-[165px] bg-cover bg-center rounded-sm"
        ></div>

        <div className="flex flex-col">
          <div className="flex flex-col ">
            <div className="flex flex-row pl-[5px] ">
              <StarIcon className=" " />
              <p className="text-sm ">{rating}</p>
              <p className="text-base text-neutral-400 ">/10</p>
            </div>
            <div className=" text-lg leading-snug  pl-[5px]"> {title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultMovieCard;
