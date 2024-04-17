import React, { useContext, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginApi, ProfileApi, changePassword } from "../api";
import { userContext } from "../App";

export function ChangePass() {
  const navigate = useNavigate();

  const handleSubmit = async(data) => {
    try{
    const response = await changePassword({
        old_password : data.oldPassword,
        new_password : data.password
    })

    alert("Your password is updated successfully")
    navigate("/")
   } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error)
    if(error?.response?.status == 400){
      alert("Check your old password")
      return
    }else{
      alert("There is some problem")
      return
    }
   }
  }
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      navigate("/");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .required("Old Password is required"),
  password: Yup.string().min(8).trim()
    .notOneOf([Yup.ref("oldPassword"), null], "New password must be different from the old password")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  });

  return (
    <section className="bg-white">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
           <Link to={"/"}>
           <div className="bg-black aspect-auto w-16 rounded-full p-4">
              <img src="/smallLogo.png" alt="B" />
            </div>
           </Link>
          </div>
         
          
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
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
                      htmlFor="oldPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Field
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <ErrorMessage
                        name="oldPassword"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        New Password
                      </label>
                      
                    </div>
                    <div className="mt-2">
                      <Field
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
                      disabled={isSubmitting}
                    >
                     Change Password
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
