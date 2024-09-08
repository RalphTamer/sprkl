import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { UserInput, userSchema } from "../utils/validationSchemas";

export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData: UserInput = userSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
