import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  fetchUserById,
  updateUser,
} from "../../utils/fetchFunctions";
import { Form, Formik } from "formik";
import { addUserFormSchema } from "../../utils/schemas";
import CustomInput from "../Form/CustomInput";
import SVGIcon from "../UI/SVGIcon";
import { useState } from "react";

const UserProfile = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    payload: string;
  } | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  if (id == null) {
    return <Navigate to="/" replace />;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  const { mutate } = useMutation({
    mutationFn: (userData: {
      fullname?: string;
      username?: string;
      email?: string;
      dateOfBirth?: string;
    }) => updateUser(id, userData),
    onSuccess: (data) => {
      setMessage({
        payload: data.message,
        type: data.success === true ? "success" : "error",
      });
    },
    onError: (error: any) => {
      setMessage({
        payload: error.message,
        type: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (data) => {
      alert(data.message);
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Error deleting user:", error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error != null) {
    return <div>Error fetching user: {error.message}</div>;
  }

  if (data == null) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center md:flex-row container my-8 gap-6 bg-gray-50 p-6 rounded-lg shadow-lg">
      <div
        className="relative w-full md:w-1/3"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div
          className="bg-gray-200 rounded-lg shadow-md"
          style={{
            backgroundImage: `url(${data.photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
          aria-label={`${data.fullname}'s photo`}
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col">
        <Formik
          initialValues={{
            username: data.username,
            fullname: data.fullname,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
          }}
          validationSchema={addUserFormSchema}
          onSubmit={async (values) => {
            mutate(values);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <CustomInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Fullname"
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date Of Birth"
                  isDate={true}
                  setDateFieldValue={async (value) => {
                    await setFieldValue("dateOfBirth", value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>

              {message != null && (
                <div
                  className={`text-center font-medium py-2 ${
                    message.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message.payload}
                </div>
              )}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <div className="flex justify-center">
                  {isSubmitting ? (
                    <SVGIcon
                      name="loader"
                      color="white"
                      className="animate-spin"
                    />
                  ) : (
                    "Save"
                  )}
                </div>
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4">
          <button
            disabled={deleteMutation.status === "pending"}
            type="submit"
            onClick={() => {
              if (
                window.confirm(
                  `WARNING: You are about to delete user ${data.username}`
                )
              ) {
                deleteMutation.mutate(id);
              }
            }}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <div className="flex justify-center">
              {deleteMutation.status === "pending" ? (
                <SVGIcon name="loader" color="white" className="animate-spin" />
              ) : (
                "Delete User"
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
