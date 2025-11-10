import LineIcon from "@/_icons/LineIcon";
const handleSeeMoreButton = () => {
  router.push(`/movies/${type}`);
};
const ButtonCard = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row w-[110px] h-[30px] border border-slate-300 rounded-sm items-center justify-center ${className}`}
    >
      See more
      <LineIcon className=" " />
    </button>
  );
};
export default ButtonCard;
