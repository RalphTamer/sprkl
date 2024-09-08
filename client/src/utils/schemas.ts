import * as yup from "yup";
import { z } from "zod";

export const usersSchema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    fullname: z.string(),
    photo: z.string(),
    dateOfBirth: z.string(),
    createdAt: z.string(),
  })
);

export type usersSchemaType = z.infer<typeof usersSchema>;

export const addUserFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  username: yup.string().min(3, "minimun 3 characters").required("Required"),
  fullname: yup.string().required("Required"),
  dateOfBirth: yup.date().required("Required"),
});
