import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usStates } from "../utitls/constent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignupApi } from "../api";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required").trim(),
  lastName: Yup.string().required("Last Name is required").trim(),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .trim(),
  password: Yup.string().required("Password is required").min(8).trim(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  state: Yup.string().required("State is required").trim(),
  email_notification: Yup.string().required("Email Notification is required"),
});
export function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      const body = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
        state: data.state,
        email_notification : data.email_notification,
      };
      const response = await SignupApi(body);
      // navigate("/signin")
      navigate("/payment", { state: body });

      // alert("Register Successfully");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      if (error?.response?.status == 400) {
        alert("Email already in use");
      }
    }
  };
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-mdcode inner_bg">
          <div className="mb-2 flex justify-center">
            <Link to={"/payment"}>
              <div className="bg-black aspect-auto w-16 rounded-full p-4">
                <img src="/smallLogo.png" alt="B" />
              </div>
            </Link>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight main_heading">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600 dont-have">
            Already have an account?
            <Link
              to="/signin"
              className="font-medium text-black transition-all duration-200 hover:underline have_acc"
            >
              Sign In
            </Link>
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              state: "-",
              email_notification: true,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("🚀 ~ SignUp ~ values:", values);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8">
                <div className="space-y-5">
                  <div className="outer-name">
                    <div className="f-name">
                      <label
                        htmlFor="firstName"
                        className="text-base font-medium text-gray-900 custom_label"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm mt-[5px]"
                        />
                      </div>
                    </div>
                    <div className="l-name">
                      <label
                        htmlFor="lastName"
                        className="text-base font-medium text-gray-900 custom_label"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <Field
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                        ></Field>
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm mt-[5px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900 custom_label custom_label"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                      ></Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-[5px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 custom_label"
                    >
                      Select State (Optional){" "}
                    </label>
                    <Field
                      as="select"
                      name="state"
                      id="countries"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="-">Choose a State</option>
                      {usStates.map((item, i) => {
                        return (
                          <option value={item.abbreviation}>{item.name}</option>
                        );
                      })}
                    </Field>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900 custom_label"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <Field
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                      ></Field>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-[5px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-base font-medium text-gray-900 custom_label"
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
                        className="text-red-500 text-sm mt-[5px]"
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="email_notification"
                        className="h-4 w-[20px] email-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="email_notification"
                        className="ml-2 block text-sm text-white text-gray-900"
                      >
                        Get notified of new picks directly via email
                      </label>
                      </div>
                      <ErrorMessage
                        name="email_notification"
                        component="div"
                        className="text-red-500 text-sm mt-[5px]"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 get_started"
                    >
                      Create Account
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
