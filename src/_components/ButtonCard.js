import LineIcon from "@/_icons/LineIcon";
const handleSeeMoreButton = () => {
  router.push(`/movies/${type}`);
};
const ButtonCard = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 h-9 px-3 rounded-sm border border-border bg-card text-foreground hover:bg-accent transition ${className}`}
    >
      See more
      <LineIcon className="size-4" />
    </button>
  );
};
export default ButtonCard;
