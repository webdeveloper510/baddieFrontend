import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../api";
// import { ChangePasswordApi } from "../api";

export function ChangePassword() {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { token } = useParams();
    const navigate = useNavigate()
  const handleSubmit = async (values) => {
    try {
    //   await ChangePasswordApi(token, values.newPassword);
    const response = await forgotPassword({
        token: token,
        password: values.confirmPassword
    })
      setPasswordChanged(true);
      navigate("/signin")
    } catch (error) {
      console.log("Error changing password:", error);
      alert("there is some error")
    }
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("New Password is required").trim().min(7),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required")
      .trim()
      .min(7),
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Change Password
          </h2>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      New Password
                    </label>
                    <div className="mt-2">
                      <Field
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Changing..." : "Change Password"}{" "}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                  {passwordChanged && (
                    <p className="text-green-500 text-sm text-center">
                      Your password has been changed successfully.
                    </p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
