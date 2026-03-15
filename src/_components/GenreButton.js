import LinesIcon from "@/_icons/LinesIcon";
import { useRouter } from "next/navigation";

const GenreButton = ({ type, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/genre/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 border border-border bg-card text-foreground rounded-full px-3 py-1 text-sm hover:bg-accent transition"
    >
      {type}
      <LinesIcon />
    </button>
  );
};

export default GenreButton;
