import React, { useState, Fragment, useContext, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  buySubscription,
  buyUserSubscription,
  getAvailablePlan,
  validatePromoCode,
} from "../api";
import { useLocation, useNavigate } from "react-router";
import { userContext } from "../App";
import Apploader from "../component/Apploader";
const stripePromise = loadStripe(process.env.REACT_APP_Stripe);

export function Payment(props) {
  console.log("🚀 ~ Payment ~ props:", props);
  const { user, setUser } = useContext(userContext);
  const { state } = useLocation();
  console.log("🚀 ~ Payment ~ location:", state);
  useEffect(() => {
    if (!state && !user) navigate("signup");
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("month");
  const [plans, setPlans] = useState(null);
  const [loader, setLoader] = useState(true);
  const onLoad = async () => {
    try {
      setLoader(true);
      const { data } = await getAvailablePlan();
      console.log("🚀 ~ onLoad ~ data:", data);
      setPlans(data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);

  const handlePlan = (value) => {
    console.log(value);
    navigate("/payment-pay", {
      state: { selectedPlan: value, bodyData: state, plans },
    });
  };

  if (loader) {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <>
      {/* <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl min-h-[50vh] custom_popup">
                                    <div className="relative flex w-full items-center overflow-hidden bg-slate-100 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 inner_popop">
                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 close"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                            <div className="sm:col-span-8 lg:col-span-12">
                                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 text-center main_heading">Enter Card details</h2>
                                                <h3 className='dont-have text-center'>You selected {selectedPlan} plan.</h3>

                                                <Elements className="h-full" stripe={stripePromise}>
                                                    <CheckoutForm
                                                        selectedPlan={selectedPlan}
                                                        bodyData={state}
                                                        plans={plans}
                                                    />
                                                </Elements>


                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}
      <section className="relative w-full overflow-hidden pb-14">
        <div className="relative  z-10 mx-auto max-w-7xl px-4 inner_back">
          {!open && (
            <div className="mx-auto md:max-w-4xl">
              <div class="flex flex-col space-y-8 pb-10 pt-12 text-center md:pt-24">
                <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10 main_heading">
                  Simple, transparent pricing
                </p>
              </div>
              <div className="-m-5 flex flex-wrap p-4">
                <div className="w-full p-5 md:w-1/2">
                  <div className="rounded-md border bg-opacity-90 need_bg">
                    <div className="min-h-[14rem]">
                      <div className="px-9 py-7">
                        <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 per_month">
                          Per Month
                        </h3>
                        <h4 className="mb-6 text-lg font-semibold leading-normal text-gray-600 amount">
                          <span className="">
                            ${plans?.month?.amount}/month
                          </span>
                          <p className="starting">Starting from</p>
                        </h4>
                        <p className="font-medium leading-relaxed text-gray-500 description">
                          {plans?.month?.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-9 pb-9 pt-8">
                      <div className="out_plan">
                        <button
                          type="button"
                          className="inline-flex h-12 animate-shimmer items-center justify-center Select_plan"
                          onClick={() => {
                            handlePlan("month");
                            // setSelectedPlan("month")
                            // setOpen(true)
                          }}
                        >
                          Select Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-5 md:w-1/2">
                  <div className="rounded-md border bg-white bg-opacity-90 need_bg">
                    <div className="min-h-[14rem]">
                      <div className="px-9 py-7">
                        <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 per_month">
                          Per Season
                        </h3>
                        <h4 className="mb-6 text-lg font-semibold leading-normal text-gray-600 amount">
                          <span className="">
                            ${plans?.season?.amount}/season
                          </span>
                          <p className="starting">Starting from</p>
                        </h4>
                        <p className="font-medium leading-relaxed text-gray-500 description">
                          {plans?.season?.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-9 pb-9 pt-8 backdrop:blur-md">
                      <div className="out_plan">
                        <button
                          onClick={() => {
                            handlePlan("season");
                            // setOpen(true)
                          }}
                          type="button"
                          className="inline-flex h-12 animate-shimmer items-center justify-center Select_plan"
                        >
                          Select Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// const CheckoutForm = ({ selectedPlan, bodyData, plans }) => {
//     const { user, setUser } = useContext(userContext);
//     const navigate = useNavigate()
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [trialPeriod, setTrialPeriod] = useState(false);
//     const [promoCode, setPromoCode] = useState('');
//     const [promoData, setPromoData] = useState(null);
//     const [subscriptionPrice, setSubscriptionPrice] = useState(0); // State to hold subscription price

//     // Calculate subscription price based on selected plan
//     useEffect(() => {
//         console.log("plans",plans)
//         if (selectedPlan === "month") {
//             setSubscriptionPrice(promoData?.type === "discount" ? parseFloat(plans.month.amount) * (1 - promoData.value / 100) : parseFloat(plans.month.amount));
//         } else if (selectedPlan === "season") {
//             setSubscriptionPrice(promoData?.type === "discount" ?parseFloat( plans.season.amount) * (1 - promoData.value / 100) :parseFloat( plans.season.amount));
//         }

//     }, [selectedPlan, promoData]);
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         try {
//             if (!stripe || !elements) {
//                 setLoading(false);
//                 return;
//             }

//             const { paymentMethod, error } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: elements.getElement(CardElement)
//             });

//             if (error) {
//                 alert("Card rejected");
//             } else {
//                 const data = {
//                     time_period: selectedPlan,
//                     payment_id: paymentMethod.id,
//                     // trial_period: trialPeriod ? "7" : "",
//                     trial_period: "7",
//                     promo_code: promoData ? promoCode : ""
//                 };

//                 try {
//                     if(bodyData){
//                         console.log("🚀 ~ handleSubmit ~ bodyData:", bodyData)
//                         const result = await buySubscription({ ...data, ...bodyData });
//                     // setUser({ ...user, status: "active" });
//                     alert("Payment done");
//                     navigate("/signin");
//                     return
//                     }
//                     const result = await buyUserSubscription(data);
//                     // setUser({ ...user, status: "active" });
//                     alert("Payment done");
//                     setUser({ ...user, status: "active" });
//                     navigate("/");
//                 } catch (err) {
//                     alert("Payment not completed");
//                 }
//             }

//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     const handleValidatePromoCode = async () => {
//         try {
//             //     setPromoCodeValid(true);
//             const {data} = await validatePromoCode({
//                 promocode: promoCode
//             })
//             setPromoData(data)
//             // setPromoCode("")

//         } catch (error) {
//             setPromoData(null)
//                 alert("Promo code is not valid");
//         }
//     };

//     return (
//         <form className="flex-col justify-between" onSubmit={handleSubmit}>
//             <CardElement options={{ hidePostalCode: true }} className='py-5' />

//            {promoData &&  <div className="flex items-center mt-2">
//                 <span className="ml-2 text-sm text-gray-600">Promo code applied. You have gotten {
//                     `${promoData?.value} ${promoData?.type == "trial" ? "days" :"percent"} ${promoData?.type}`
//                 }</span>

//             </div>}

//             <div className="flex items-center input-butns my-4 ">
//                 <input
//                     type="text"
//                     placeholder="Enter promo code"
//                     value={promoCode}
//                     onChange={(e) =>{ setPromoCode(e.target.value);setPromoData(null)}}
//                     className={`border ${promoData?"border-green-300":"border-gray-300"} rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-1 promo-input focus:ring-gray-500 custom_input`}
//                 />

//                {promoData ? <button
//                     type="button"
//                     onClick={()=>{
//                         setPromoCode("");
//                         setPromoData(null)
//                     }}
//                     className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"

// >
//                     Remove
//                 </button> :<button
//                     type="button"
//                     onClick={handleValidatePromoCode}
//                     className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 leading-normal promo-code">
//                     Apply Promo Code
//                 </button>}
//             </div>
//             <div className="flex items-center my-4  ">
//             {loading ? <Apploader size={3} /> : (
//                 <button
//                     className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border subscribe-butns w-full"
//                     type="submit"
//                     disabled={!stripe || !elements}
//                 >
//                     Subscribe in {subscriptionPrice.toFixed(2)} USD/ {selectedPlan}
//                 </button>

//             )}
//             </div>
//         </form>
//     );
// };
