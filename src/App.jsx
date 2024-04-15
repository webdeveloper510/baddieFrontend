import logo from "./logo.svg";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import Sidebars from "./component/Sidebar.jsx";
import Header from "./component/header";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { SignUp } from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import Page1 from "./pages/picks/page1";
import Page2 from "./pages/picks/Page2";
import AlPage1 from "./pages/alMl/page1";
import Alpage2 from "./pages/alMl/alpage2";
import Metric from "./pages/metric/metric";
import Expected from "./pages/expected/expected";
import { ProfileApi } from "./api";
import Guest from "./utitls/GuestRoute";
import SecureRoute from "./utitls/SecureRoute";
import AdminSecureRoute from "./utitls/AdminSecureRoute.jsx";
import Apploader from "./component/Apploader";
import { Payment } from "./pages/payment";
import { ErrorFour } from "./pages/PageNotFound";
import Eda from "./pages/eda/eda";
import { Plan } from "./pages/plan";
import Admindashboard from "./pages/admin/dashboard/dashboard.jsx";
import Userlist from "./pages/admin/userlist/Userlist.jsx";
import TransactionList from "./pages/admin/transaction/transaction.jsx";

// import 'bootstrap/dist/css/bootstrap.min.css';
export const userContext = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [appLoad, setAppLoad] = useState(false);
  // useEffect(()=>{
  //   const login = localStorage.getItem("login")
  //   setIsLogin(login)
  //   console.log(location)
  //   if(location.pathname == "/signin" || location.pathname == "/signup" ){
  //     setIsLogin(false)
  //   }else{
  //     setIsLogin(true)
  //   }
  //   // if(login){
  //   //   navigate("/")
  //   // }else{
  //   //   navigate("/signin")
  //   // }
  // },[location])
  const onLoadApp = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const response = await ProfileApi();
        if (response) {
          setUser(response.data);
          // setIsLogin(true);
          setLoading(false);
          setAppLoad(true);
          return;
        }
      }
      // setIsLogin(false);
      // if (location.pathname != "/") navigate("/signin");
      localStorage.clear();
      setLoading(false);
      setAppLoad(true);
    } catch (error) {
      // setIsLogin(false);
      // if (location.pathname != "/") navigate("/signin");
      localStorage.clear();
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadApp();
  }, []);
  if (loading || !appLoad) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <userContext.Provider value={{ user, setUser, appLoad }}>
      <div className=" flex flex-col min-h-screen">
        {user ? (
          <>
            <Header show={show} setShow={setShow} />
            <div className="md:flex sm:block min-h-screen bg-lightblack w-full">
              <Sidebars show={show} setShow={setShow} />
              <div
                className={`${
                  !show ? "w-[86%] mobile-side" : "w-[96%] mobile-side"
                }`}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <SecureRoute>
                        <Home />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/picks-analysis"
                    element={
                      <SecureRoute>
                        <Page1 />
                      </SecureRoute>
                    }
                  />
                   <Route
                    path="/admin-dashboard"
                    element={
                      <AdminSecureRoute>
                        <Admindashboard />
                       </AdminSecureRoute>
                    }
                  />
                  <Route
                    path="/user-list"
                    element={
                      <AdminSecureRoute>
                        <Userlist />
                      </AdminSecureRoute>
                    }
                  />
                   <Route
                    path="/transaction-list"
                    element={
                      <AdminSecureRoute>
                        <TransactionList />
                      </AdminSecureRoute>
                    }
                  />
                  <Route
                    path="/plan"
                    element={
                      <SecureRoute>
                        <Plan />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/picks-analysis2"
                    element={
                      <SecureRoute>
                        <Page2 />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/eda"
                    element={
                      <SecureRoute>
                        <Eda />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/al-ml"
                    element={
                      <SecureRoute>
                        <AlPage1 />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/al-ml-hub/:type"
                    element={
                      <SecureRoute>
                        <Alpage2 />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/metric-model/:type"
                    element={
                      <SecureRoute>
                        <Metric />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/expected-value"
                    element={
                      <SecureRoute>
                        <Expected />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <SecureRoute>
                        <Payment />
                      </SecureRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <Guest>
                        <SignUp />
                      </Guest>
                    }
                  />
                  <Route
                    path="/signin"
                    element={
                      <Guest>
                        <SignIn />
                      </Guest>
                    }
                  />
                  <Route path="*" element={<ErrorFour />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Guest>
                  <>
                    <Header show={show} setShow={setShow} />
                    <div className="md:flex sm:block min-h-screen w-full bg-lightblack">
                      <Sidebars show={show} setShow={setShow} />
                      <div className="w-[94%] mobile-side">
                        <Home />
                      </div>
                    </div>
                  </>
                </Guest>
              }
            />
            <Route
              path="/picks-analysis"
              element={
                <Guest>
                  <>
                    <Header show={show} setShow={setShow} />
                    <div className="md:flex sm:block min-h-screen w-full bg-lightblack">
                      <Sidebars show={show} setShow={setShow} />
                      <div className="w-[94%] mobile-side">
                        <Page1 />
                      </div>
                    </div>
                  </>
                </Guest>
              }
            />
            <Route
              path="/picks-analysis2"
              element={
                <Guest>
                  <>
                    <Header show={show} setShow={setShow} />
                    <div className="md:flex sm:block min-h-screen w-full bg-lightblack">
                      <Sidebars show={show} setShow={setShow} />
                      <div className="w-[94%] mobile-side">
                        <Page2 />
                      </div>
                    </div>
                  </>
                </Guest>
              }
            />
            <Route
              path="/signup"
              element={
                <Guest>
                  <SignUp />
                </Guest>
              }
            />
            <Route
              path="/signin"
              element={
                <Guest>
                  <SignIn />
                </Guest>
              }
            />
            <Route
              path="/payment"
              element={
                <Guest>
                  <Payment />
                </Guest>
              }
            />
           
            <Route path="*" element={<Navigate to={"/signin "} />} />
          </Routes>
        )}
      </div>
    </userContext.Provider>
  );
}

export default App;
