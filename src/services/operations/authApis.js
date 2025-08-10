import toast from "react-hot-toast";
import { authEndPoints } from "../apis.js";
import {
  setLoading,
  setToken,
  updateSignUpEmail,
} from "../../slices/authSlicer.js";
import { apiConnector } from "../apiconnectors.js";
import { setUser } from "../../slices/profileSlicer.js";
import { setCoins } from "../../slices/coinSlicer.js";

const {
  SEND_OTP_API,
  SIGN_UP_API,
  LOGIN_API,
  GOOGLE_OAUTH_API,
  OTP_VERIFY_API,
  REPOR_ISSUE_API,
} = authEndPoints;
// sendOtp
export function sendOtp(email, navigate) {
  // console.log("SEND OTP start ->",email)
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", SEND_OTP_API, {
        email,
      });

      // console.log("SEND OTP res ---> ",res);
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Send Otp SuccessFull");
      navigate("/verify-email");
    } catch (error) {
      console.log("Error in SENDOTP-F ", error);
      toast.error(error);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
// otp verify
export function otpVerify(otp, email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", OTP_VERIFY_API, {
        otp,
        email,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success(response.data.message);
      navigate("/complete-profile");
    } catch (err) {}
  };
}

//  google Oauth
export function Oauth(email,user, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", GOOGLE_OAUTH_API, {
        email,user
      });
      dispatch(updateSignUpEmail(email));
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      toast.dismiss(toastId);
      // navigate("/login");
      console.log("naviator: ", response.data);
      const navTo = String(response?.data?.navigateTo || "")
        .trim()
        .toLowerCase();

      if (navTo === "home") {
            // authenticated user
            toast.success("Login successfull");
            // console.log("LOgin data ",response)
            // console.log("Totkn login :",response.data.token)
            dispatch(setToken(response.data.token));
            const image = response.data.user.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`;
            // setUser
            dispatch(setUser({ ...response.data.user, image: image }));
            // token
            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            // user
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(setCoins(response.data.user.coins));
            navigate("/");
      } else if (navTo) {
        navigate(`/${navTo}`);
      } else {
        console.warn("Navigator not working, redirecting to sign up");
        navigate("/complete-profile");
      }
    } catch (err) {
      console.log("Error in Oauth ", err);
      toast.error(err);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function signUp(
  firstName,
  accountType,
  lastName,
  email,
  password,
  conformPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    console.log("SignUp before");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGN_UP_API, {
        firstName,
        lastName,
        password,
        conformPassword,
        email,
        accountType,
      });
      console.log("API response of signup ", response);
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      toast.dismiss(toastId);
      navigate("/login");
    } catch (error) {
      console.log("Error in ", error);
      toast.error(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      // console.log(response.data)
      toast.success("Login successfull");
      // console.log("LOgin data ",response)
      // console.log("Totkn login :",response.data.token)
      dispatch(setToken(response.data.token));
      const image = response.data.user.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`;
      // setUser
      dispatch(setUser({ ...response.data.user, image: image }));
      // token
      localStorage.setItem("token", JSON.stringify(response.data.user.token));
      // user
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setCoins(response.data.user.coins));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error : ", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function reportIssue(issueDesc, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await apiConnector(
        "POST",
        REPOR_ISSUE_API,
        {
          issueDesc,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log("REsponse reportIssue... ",res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Reported Issue!");
    } catch (error) {
      console.log("Error in reportIssue");
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };
}
export function logOut(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));

    // remove from local storeage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
