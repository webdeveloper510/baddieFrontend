import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassRequest } from "../api";
// import { ForgotPasswordApi } from "../api";

export function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values) => {
    try {
      await forgotPassRequest({email:values.email})
      setEmailSent(true);
    } catch (error) {
        if(error.response.status == 404){
            alert("User not exist");
            return
        }
      console.log("Error sending forgot password email:", error);
      alert("Error sending forgot password request");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required").trim(),
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          {!emailSent && <Formik
            initialValues={{
              email: "",
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
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <ErrorMessage
                        name="email"
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
                      {isSubmitting ? "Sending..." : "Send Reset Link"}{" "}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                 
                </div>
              </Form>
            )}
          </Formik>}
          {emailSent && (
                    <p className="text-green-500 text-sm text-center">
                      We've sent instructions to reset your password to your email address. Please check your inbox.
                    </p>
                  )}
          <p className="mt-8 text-center text-sm text-gray-600 ">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
    </section>
  );
}
