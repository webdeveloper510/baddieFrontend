import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = "https://baddie.pro/"
console.log("🚀 ~ process.env.REACT_APP_API_URL:", process.env.REACT_APP_API_URL)

Axios.defaults.baseURL = API_URL
let authApi = Axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const SignupApi = async(data)=>{
    try {
        const response = await Axios.post("register-validation/",data);
        
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const LoginApi = async(data)=>{
    try {
        const response = await Axios.post("login/",data);
        localStorage.setItem("token", response.data.token.access);
        authApi = Axios.create({
            baseURL: API_URL,
            headers: {
              Authorization: `Bearer ${response.data.token.access}`,
            },
          });
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const ProfileApi = async()=>{
    try {
        const response = await authApi.get("userprofile/");
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const GetTeamApi = async()=>{
    try {
        const response = await authApi.post("opposite-team/");
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const GetPlayerApi = async(player)=>{
    try {
        const response = await authApi.post("player/",{player});
        return response.data
    } catch (error) {
        throw (error)
    }
}


export const getEvalCal = async(data)=>{
    try {
        const response = await authApi.post("eval-cal/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getSegmentData = async(data)=>{
    try {
        const response = await authApi.post("pitcher-summary/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getLookupData = async(data)=>{
    try {
        const response = await authApi.post("player-summary/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getDesiredPlot = async(data)=>{
    try {
        const response = await authApi.post("desired-plot/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const buySubscription = async(data)=>{
    try {
        const response = await Axios.post("payment/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const buyUserSubscription = async(data)=>{
    try {
        const response = await authApi.post("new-subscription/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getPicks = async(data)=>{
    try {
        const response = await Axios.post("get-picks/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const validatePromoCode = async(data)=>{
    try {
        const response = await Axios.post("validate-promocode/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getEda = async(data)=>{
    try {
        const response = await authApi.post("eda-dashboard/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const getSubscription = async()=>{
    try {
        const response = await authApi.get("get-subscription//");
        return response.data
    } catch (error) {
        throw (error)
    }
}
export const cancelSubscription = async(data)=>{
    try {
        const response = await authApi.post("cancel-subscription/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getAvailablePlan = async()=>{
    try {
        const response = await Axios.get("subscription-plans/");
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getAdminDashboard = async(data)=>{
    try {
        const response = await authApi.post("dashboard/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getUserList = async(data)=>{
    try {
        const response = await authApi.post("users-list/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const userStatusChange = async({id,status}) => {
    console.log("🚀 ~ userStatusChange ~ id,status:", id,status)
    try {
        const response = await authApi.post(`/${!status?"enable-user":"disable-user"}/${id}`);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getTransactions = async(data)=>{
    try {
        const response = await authApi.post("transactions/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const changePassword = async(data)=>{
    try {
        const response = await authApi.post("change-password/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const forgotPassRequest = async(data)=>{
    try {
        const response = await Axios.post("send-reset-password-email/",data);
        return response.data
    } catch (error) {
        throw (error)
    }
}


export const forgotPassword = async(data)=>{
    try {
        const response = await Axios.post("reset-password/"+data.token,{password:data.password});
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getPicksSummary = async()=>{
    try {
        const response = await authApi.get("getpicks-summary/");
        return response.data
    } catch (error) {
        throw (error)
    }
}

export const getMatchupData = async()=>{
    try {
        const response = await authApi.get("matchup/");
        return response.data
    } catch (error) {
        throw (error)
    }
}
