import { useState } from "react";
import { type sortType } from "../utils/types";

type Props = {
  sortOption: (sortOption: sortType) => void;
  initialSortOption: sortType;
};

const SortUI = ({ sortOption, initialSortOption }: Props) => {
  const [currentSort, setCurrentSort] = useState<sortType>(initialSortOption);

  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => {
          // since theres no pagination , im doing the sort on client
          const value = e.target.value as sortType;
          if (value === "a-z" || value === "z-a" || value === "noSort") {
            setCurrentSort(value);
            sortOption(value);
          }
        }}
        className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
      >
        <option value="noSort">No sort</option>
        <option value="a-z">Fullname: A-Z</option>
        <option value="z-a">Fullname: Z-A</option>
      </select>
    </div>
  );
};

export default SortUI;
