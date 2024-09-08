import { Form, Formik } from "formik";
import CustomInput from "../Form/CustomInput";
import SVGIcon from "../UI/SVGIcon";
import { useState } from "react";
import { addUserFormSchema } from "../../utils/schemas";
import { createUser } from "../../utils/fetchFunctions";
import { useMutation } from "@tanstack/react-query";

const AddUser = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data.message == null || data.success == null)
        throw new Error("unexpected response");

      setMessage({
        payload: data.message,
        type: data.success === true ? "success" : "error",
      });
    },
    onError: (error: any) => {
      console.log(error.message);

      setMessage({
        payload: error.message,
        type: "error",
      });
    },
  });

  return (
    <div>
      <div className="container mx-auto  my-8 md:px-[140px]">
        <Formik
          initialValues={{
            fullname: "",
            dateOfBirth: "",
            username: "",
            email: "",
          }}
          validationSchema={addUserFormSchema}
          onSubmit={async (values) => {
            mutate(values);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex flex-col space-y-2">
                <CustomInput
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                />
                <CustomInput
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date Of Birth"
                  isDate={true}
                  setDateFieldValue={async (value) => {
                    await setFieldValue("dateOfBirth", value);
                  }}
                />
                <CustomInput
                  name="username"
                  type="text"
                  placeholder="Enter username"
                />
                <CustomInput
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                />
                {message != null && (
                  <div
                    className="text-center"
                    style={{
                      fontWeight: 500,
                      color: message.type === "success" ? "green" : "red",
                    }}
                  >
                    {message.payload}
                  </div>
                )}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  style={{}}
                  className="flex items-center justify-center rounded-[32px] bg-red-600 py-4 text-white"
                >
                  {isSubmitting === true ? (
                    <SVGIcon
                      name="loader"
                      className="animate-spin"
                      color="white"
                      size={28}
                    />
                  ) : (
                    "Add User"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
