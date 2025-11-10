import LinesIcon from "@/_icons/LinesIcon";
import { SelectItem } from "@radix-ui/react-select";
const GenreButton = ({ type }) => {
  return (
    <button>
      <SelectItem value={type} className="border rounded-full">
        <LinesIcon />
      </SelectItem>
    </button>
  );
};
export default GenreButton;
