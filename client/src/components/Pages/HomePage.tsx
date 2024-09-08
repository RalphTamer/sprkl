import { useState, useEffect } from "react";
import "../../App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../utils/fetchFunctions";
import { usersSchemaType } from "../../utils/schemas";
import { sortType } from "../../utils/types";
import SearchBox from "../SearchBox";
import SortUI from "../SortUI";
import UserCard from "../UserCard";

function HomePage() {
  const [sortOption, setSortOption] = useState<sortType>("noSort");
  const [users, setUsers] = useState<usersSchemaType | null>(null);
  const { data, error, isLoading, isError } = useQuery<usersSchemaType>({
    queryKey: ["allUsers"],
    queryFn: fetchUsers,
  });
  useEffect(() => {
    if (data != null) {
      setUsers(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error fetching users: {(error as Error)?.message}</div>;
  }

  if (data == null || data.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div className="container">
      <div className="flex  items-center my-4">
        <SortUI
          initialSortOption={sortOption}
          sortOption={(option) => {
            if (option === "a-z") {
              setUsers((prev) => {
                if (prev == null) return null;
                const sorted = [...prev].sort((a, b) =>
                  a.fullname.localeCompare(b.fullname)
                );
                return sorted;
              });
            } else if (option === "z-a") {
              setUsers((prev) => {
                if (prev == null) return null;
                const sorted = [...prev].sort((a, b) =>
                  b.fullname.localeCompare(a.fullname)
                );
                return sorted;
              });
            } else {
              setUsers(data);
            }
            setSortOption(option);
          }}
        />
        <SearchBox
          onCloseClick={() => {
            setSortOption("noSort");
          }}
          searchResult={(searchResult) => {
            setSortOption("noSort");
            setUsers(searchResult);
          }}
        />
      </div>
      <div className="container grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {users != null &&
          users.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })}
      </div>
    </div>
  );
}

export default HomePage;
