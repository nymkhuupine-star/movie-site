import StarIcon from "@/_icons/StarIcon";
import { useRouter } from "next/navigation";
import ButtonCard from "./ButtonCard";
import SearchLineIcon from "@/_icons/SearchLineIcon";

const SearchMovieCard = ({ rating, title, imageUrl, id }) => {
  const router = useRouter();

  const handleRouter = () => {
    router.push(`/movie/${id}`);
  };
  return (
    <div className="bg-white  w-[557px]">
      <div
        className={`bg-white rounded-sm h-[116px] flex flex-row w-[557px] items-center pl-[20px]  `}
        onClick={handleRouter}
      >
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="h-[100px] w-[67px] bg-cover bg-center rounded-sm"
        ></div>

        <div className="flex flex-col">
          <div className="flex flex-col ">
            <div className="flex flex-row items-center pl-[10px]">
              <StarIcon className=" " />
              <p className="text-sm ">{rating}</p>
              <p className="text-base text-neutral-400 ">/10</p>
            </div>
            <div className="pl-[8px] text-base leading-snug "> {title}</div>
          </div>

          <div className=" flex flex-row gap-[301px]">
            <p className="pl-[10px]">2021</p>
            <ButtonCard className="  text-xs" />
          </div>
        </div>
      </div>
      <SearchLineIcon />
      {/* <p> See all results for "Wicked"</p> */}
    </div>
  );
};
export default SearchMovieCard;
