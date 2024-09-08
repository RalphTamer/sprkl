import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchFetchUsers } from "../utils/fetchFunctions";
import { useSearchParams } from "react-router-dom";
import { usersSchemaType } from "../utils/schemas";
import SVGIcon from "./UI/SVGIcon";
import _ from "lodash";

type Props = {
  searchResult: (result: usersSchemaType) => void;
  onCloseClick: () => void;
};

const SearchBox = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: (query: string) => searchFetchUsers(query),
    onSuccess: (data) => {
      setSearchParams({ q: searchQuery });
      props.searchResult(data);
    },
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });

  const debouncedMutate = useMemo(
    () =>
      _.debounce((query: string) => {
        mutate(query);
        setSearchParams({ q: query });
        setIsLoading(false);
      }, 700),
    [mutate, setSearchParams]
  );

  useEffect(() => {
    if (initialQuery) {
      mutate(initialQuery);
    }
  }, [initialQuery, mutate]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative flex items-center">
        <input
          className="w-full rounded-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={(e) => {
            setIsLoading(true);
            const newValue = e.target.value;
            setSearchQuery(newValue);
            debouncedMutate(newValue);
          }}
        />
        {searchQuery && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              setSearchQuery("");
              mutate("");
              props.onCloseClick();
            }}
          >
            <SVGIcon name="x" />
          </button>
        )}
        {isLoading === true && (
          <div
            className="absolute top-1/2 right-[-30px]"
            style={{
              transform: "translate(0,-50%)",
            }}
          >
            <SVGIcon name="loader" className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
