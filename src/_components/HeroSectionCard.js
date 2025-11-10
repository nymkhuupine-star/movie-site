import StarIcon from "@/_icons/StarIcon";
import PlayIcon from "@/_icons/PlayIcon";
import { Badge } from "lucide-react";

const HeroSectionCard = ({ title, rating, imageUrl }) => {
  return (
    <div className=" flex items-center ">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="w-full  h-[600px] max-w-[1440px] bg-cover bg-center flex items-center rounded-sm "
      >
        <div className="flex  flex-col  pt-[178px] pl-[140px] pb-[158px]  ">
          <div className="text-white flex flex-col">
            <p className="text-base"> Now Playing:</p>
            <p className="text-4xl"> {title}</p>
            <div className="flex flex-row">
              <StarIcon className=" " />
              <p className="text-lg">{rating}</p>
              <p className="text-lg text-neutral-300 "> /10</p>
            </div>
          </div>
          <div className="text-white w-[302px] h-[80px] text-sm leading-relaxed ">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.{" "}
          </div>
          <button className=" bg-slate-50 border-slate-300 w-[145px] h-[40px]  flex items-center justify-center flex-row mt-[70px] rounded-lg   ">
            <PlayIcon className=" " />
            <Badge className="text-black"> Watch Trailer</Badge>
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeroSectionCard;
