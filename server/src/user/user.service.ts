import { db } from "../utils/db.server";

export const getUsers = async () => {
  return await db.user.findMany();
};

export const createUser = async (args: {
  fullname: string;
  username: string;
  email: string;
  dateOfBirth: any;
}) => {
  const { fullname, email, username, dateOfBirth } = args;
  // Validate input
  if (!fullname || !username || !email) {
    throw new Error("All fields are required");
  }

  try {
    // Create a new user
    const newUser = await db.user.create({
      data: {
        dateOfBirth: new Date(dateOfBirth),
        email,
        fullname,
        photo: "https://loremflickr.com/417/2247?lock=1015901405056947",
        username,
      },
    });

    return newUser;
  } catch (err: any) {
    console.error("Error creating user:", err.message);
    throw new Error("Error creating user");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findFirst({
      where: {
        username,
      },
    });
  } catch (err) {
    throw new Error("Error fetching user by email");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    throw new Error("Error fetching user by email");
  }
};
export const getUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (err) {
    throw new Error("Error fetching user by ID");
  }
};

type UpdateUserInput = {
  fullname?: string;
  username?: string;
  email?: string;
  dateOfBirth?: string;
};
export const updateUser = async (userId: string, userData: UpdateUserInput) => {
  return db.user.update({
    where: { id: userId },
    data: userData,
  });
};

export const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (err) {
    throw new Error("User not found");
  }
};
