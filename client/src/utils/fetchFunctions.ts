import { usersSchema, usersSchemaType } from "./schemas";

export const fetchUsers = async (): Promise<usersSchemaType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`);
  const jsonData = await response.json();

  const parsed = usersSchema.safeParse(jsonData);
  if (!parsed.success) {
    console.error("Zod validation failed:", parsed.error);
    throw new Error("Failed to validate user data");
  }
  return parsed.data;
};
export const searchFetchUsers = async (
  query: string
): Promise<usersSchemaType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/user/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const parsedData = usersSchema.safeParse(await response.json());
  if (parsedData.data == null) {
    throw new Error("Error parsing data");
  }
  return parsedData.data;
};

export const createUser = async (userData: {
  fullname: string;
  username: string;
  email: string;
  dateOfBirth: string;
}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const fetchUserById = async (
  userId: string
): Promise<usersSchemaType[0]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/user/${userId}`
  );

  return response.json();
};
export const updateUser = async (
  userId: string,
  userData: {
    fullname?: string;
    username?: string;
    email?: string;
    dateOfBirth?: string;
  }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/user/update/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};
export const deleteUser = async (userId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/user/delete/${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error deleting user");
  }

  return response.json();
};
