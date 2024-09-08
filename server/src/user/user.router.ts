import express from "express";
import type { Request, Response } from "express";
import Fuse from "fuse.js";
import type { body, validationResult } from "express-validator";

import * as UserService from "./user.service";
import { validateUserInput } from "../middleware/userMiddleware";
import { UserInput } from "../utils/validationSchemas";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

userRouter.get("/search", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers();

    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(200).json(users);
    }

    const options = {
      keys: ["fullname", "username", "email"],
      distance: 500,
      threshold: 0.4,
    };

    const fuse = new Fuse(users, options);

    const results = fuse.search(q);

    const searchResults = results.map((result) => result.item);

    return res.status(200).json(searchResults);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

userRouter.post("/", validateUserInput, async (req: Request, res: Response) => {
  const userData: UserInput = req.body;
  const { fullname, username, email, dateOfBirth } = userData;
  try {
    console.log("here");
    const isUsernameAlreadyExist = await UserService.getUserByUsername(
      username
    );
    if (isUsernameAlreadyExist != null) {
      throw new Error("Username already exists");
    }
    const isEmailAlreadyExist = await UserService.getUserByEmail(email);
    if (isEmailAlreadyExist != null) {
      throw new Error("Email already exists");
    }
    await UserService.createUser({
      fullname,
      username,
      email,
      dateOfBirth,
    });

    return res.status(201).json({
      success: true,
      message: "user creation success",
    });
  } catch (err: any) {
    if (err.message === "All fields are required") {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err.message === "Username already exists") {
      return res.status(403).json({ success: false, message: err.message });
    }
    if (err.message === "Email already exists") {
      return res.status(403).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

userRouter.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserService.getUserById(userId);

    // if (user == null) {
    //   throw new Error("User not found");
    // }
    return res.status(200).json(user);
  } catch (err: any) {
    throw new Error(err.message);
  }
});

userRouter.put(
  "/update/:userId",
  validateUserInput,
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userData: UserInput = req.body;
    const { fullname, username, email, dateOfBirth } = userData;

    try {
      const existingUser = await UserService.getUserById(userId);
      if (existingUser == null) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (username && username !== existingUser.username) {
        const isUsernameAlreadyExist = await UserService.getUserByUsername(
          username
        );
        if (isUsernameAlreadyExist != null) {
          return res
            .status(403)
            .json({ success: false, message: "Username already exists" });
        }
      }

      if (email && email !== existingUser.email) {
        const isEmailAlreadyExist = await UserService.getUserByEmail(email);
        if (isEmailAlreadyExist != null) {
          return res
            .status(403)
            .json({ success: false, message: "Email already exists" });
        }
      }

      const updatedUser = await UserService.updateUser(userId, {
        fullname,
        username,
        email,
        dateOfBirth,
      });

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

userRouter.delete("/delete/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserService.deleteUser(userId);
    if (deletedUser === null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});
