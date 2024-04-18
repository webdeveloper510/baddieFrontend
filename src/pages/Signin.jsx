import React, { useContext, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginApi, ProfileApi } from "../api";
import { userContext } from "../App";

export function SignIn() {
  const {user,setUser} = useContext(userContext)
  const navigate = useNavigate();

  const handleSubmit = async(data) => {
    try{
    const response = await LoginApi(data)
    localStorage.setItem("token", response.token.access)
    const responseFromProfile = await ProfileApi();
      console.log("🚀 ~ handleSubmit ~ responseFromProfile:", responseFromProfile)
      if(responseFromProfile){
        console.log("🚀 ~ handleSubmit ~ responseFromProfile:", responseFromProfile)
        setUser(responseFromProfile.data);
        alert("Login Successfully");
        if(responseFromProfile?.data?.is_admin){
          navigate("/admin-dashboard")
        }else{
          navigate("/")
         return
        }
      }
   } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error)
    if(error?.response?.status == 400){
      alert("Check your credentials")
      return
    }else if(error?.response?.status == 404){
      alert("Check your credentials")
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
    email: Yup.string().email("Invalid email").required("Email is required").trim(),
    password: Yup.string().required("Password is required").trim().min(7),
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
           <Link to={"/"}>
           <div className="bg-black aspect-auto w-16 rounded-full p-4">
              <img src="/smallLogo.png" alt="B" />
            </div>
           </Link>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a account
            </Link>
          </p>
          <Formik
            initialValues={{
              email: "",
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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
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
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      disabled={isSubmitting}
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
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
