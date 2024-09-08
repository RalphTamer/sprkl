import { Link } from "react-router-dom";
import { usersSchemaType } from "../utils/schemas";

type Props = {
  user: usersSchemaType[0];
};
const UserCard = (props: Props) => {
  const { user } = props;
  return (
    <Link
      to={`/user/${user.id}`}
      key={user.id}
      className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white overflow-hidden shadow-md cursor-pointer"
      style={{
        borderRadius: 12,
      }}
    >
      <div
        className="bg-white"
        style={{
          backgroundImage: `url(${user.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          width: "100%",
          height: "200px",
        }}
        aria-label={`${user.fullname}'s photo`}
      />

      <div className="px-4 py-3">
        <div className="text-center">
          <p className="text-lg font-semibold">{user.fullname}</p>

          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>

        <p className="text-center text-sm mt-2 text-gray-600 truncate">
          {user.email}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
