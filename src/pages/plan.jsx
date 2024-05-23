import React, { useState, Fragment, useContext, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


import { useNavigate } from 'react-router'
import { userContext } from '../App'
import Apploader from '../component/Apploader'
import { cancelSubscription, getAvailablePlan, getSubscription } from '../api'


export function Plan(props) {

    const { user, setUser } = useContext(userContext);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [loader, setLoader] = useState(false);
    const [sub, setSub] = useState(null);
    const [plans, setPlans] =useState(null);
    const onLoad = async () => {
        try {
            setLoader(true);
            const response = await getSubscription();
            setSub(response.data)
            const {data} = await getAvailablePlan();
        console.log("🚀 ~ onLoad ~ data:", data)
        setPlans(data)
            setLoader(false);
        } catch (error) {
            alert("There is some error");
            setLoader(false);
        }

    };
    useEffect(() => { onLoad() }, []);

    const handleCancelPlan = async()=>{
        try {
            setLoader(true);
            const response = await cancelSubscription({
                subscription_id : sub.subscription_id
            });
            alert("You cancel your subscription")
            setUser(null);
            localStorage.clear();
            navigate("/");
            setLoader(false);
        } catch (error) {
            alert("There is some error");
            setLoader(false);
        }
    } 
    if (loader) {
        return <div className="w-full h-full flex items-center justify-center"><Apploader size={80} />
        </div>
      }
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
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
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl min-h-[50vh]">
                                    <div className="relative flex w-full items-center overflow-hidden bg-slate-100 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 plan_pop">
                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 ">
                                            <div className="sm:col-span-8 lg:col-span-12">
                                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 text-center">Are you want to cancel your subscription</h2>
                                                <div className="mt-6 flex justify-center item-center">
                                                    <button
                                                        type="button"
                                                        className="px-12 py-4 rounded-full bg-red-600 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-red-500 transition-colors duration-200"
                                                        onClick={() => {
                                                            // Handle cancellation logic here
                                                            handleCancelPlan();
                                                            setOpen(false); // Close the dialog
                                                        }}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ml-3 px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        No
                                                    </button>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <section className="relative w-full overflow-hidden pb-14">

                <div className="relative  z-10 mx-auto max-w-7xl px-4 inner_back inn_plans">
                    <div className="mx-auto md:max-w-4xl">

                        <div class="flex flex-col space-y-8 pb-10 pt-12 text-center md:pt-24">
                            <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10 main_heading">
                                Simple, transparent pricing
                            </p>
                        </div>
                        <div className="-m-5 flex flex-wrap p-4">
                            <div className="w-full p-5 md:w-1/2">
                                <div className="rounded-md border bg-white bg-opacity-90 need_bg ">
                                    <div className="min-h-[14rem]">
                                        <div className="px-9 py-7 ">
                                            <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900  per_month">Per Month {sub?.subscription_type === "month" &&
                                            <span className='text-green-800'>(Active Plan)</span>}</h3>
                                        </div>
                                        <h4 className="mb-6 text-lg font-semibold leading-normal text-gray-600 px-9 amount">
                                            <span className="">${plans?.month?.amount}/month</span>
                                            <p className='starting'>Starting from</p>
                                        </h4>
                                        <p className="font-medium leading-relaxed text-gray-500 px-9 description">
                                            {plans?.month?.description}
                                            </p>
                                    </div>
                                    <div className="px-9 pb-9 pt-8 min-h-44">

                                        <div className="out_plan">
                                            {sub?.subscription_type === "month" && <>
                                           
                                           
                                            <button
                                                type="button"
                                                className="inline-flex h-12 animate-shimmer items-center justify-center Select_plan"
                                                onClick={() => {

                                                    setOpen(true)
                                                }}
                                            >
                                                Cancel Plan
                                            </button></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <div className="rounded-md border bg-white bg-opacity-90 need_bg">
                                    <div className="min-h-[14rem]">
                                        <div className="px-9 py-7">
                                            <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 per_month">Per Season  {sub?.subscription_type === "season" &&
                                            <span className='text-green-800'>(Active Plan)</span>}</h3>
                                        </div>
                                        <h4 className="mb-6 text-lg font-semibold leading-normal text-gray-600 px-9 amount">
                                            <span className="">${plans?.season?.amount}/season</span>
                                            <p className='starting'>Starting from</p>
                                        </h4>
                                            <p className="font-medium leading-relaxed text-gray-500 px-9 description">
                                            {plans?.season?.description} </p>
                                    </div>

                                    <div className="px-9 pb-9 pt-8 backdrop:blur-md min-h-44">
                                        <div className="md:inline-block">
                                            {sub?.subscription_type === "season" &&<>
                                         
                                            <button
                                                onClick={() => {

                                                    setOpen(true)
                                                }}
                                                type="button"
                                                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                            >
                                                Cancel Plan
                                            </button>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


