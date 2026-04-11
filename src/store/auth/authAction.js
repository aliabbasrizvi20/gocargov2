import { setUser, logout } from "./authSlice";
import { API } from "../../helpers/requests";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", userData);

      const token = response.data.token;

      // Save JWT + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setUser(response.data.user));
      return response.data.user; // success payload
    } catch (error) {
      const status = error.response?.status;

      // Custom messages based on status
      if (status === 401) {
        return rejectWithValue("Invalid email or password");
      } else if (status === 500) {
        return rejectWithValue("Server error, please try again");
      }

      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// // Login with JWT
// export const loginUser = (userData) => async (dispatch) => {
//   try {
//     const response = await API.post("/auth/login", userData);
//     if (response.status === 200) {
//       const token = response.data.token;
//       localStorage.setItem("token", token); // save JWT
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       dispatch(setUser(response.data.user));
//     }
//   } catch (error) {
//     console.error("Login failed:", error.response?.data || error.message);
//   }
// };

// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(logout());
};

// Fetch logged-in user info (on refresh)
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
     console.log("Token being sent to backend:", token); // <-- Add this
return;
    }
  // console.log("Sending token to backend:", token);
  
    const response = await API.get("/auth/session", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.error("Fetch user failed:", error.response?.data || error.message);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  }
};



// import { setUser, logout } from "./authSlice";
// import { API } from "../../helpers/requests";

// // Login with JWT
// export const loginUser = (userData) => async (dispatch) => {
//   try {
//     const response = await API.post("/auth/login", userData); // direct endpoint
//     if (response.status === 200) {
//       const token = response.data.token;
//       localStorage.setItem("token", token); // save JWT

//       // set user in Redux using backend returned user info
//       dispatch(setUser(response.data.user));
//     }
//   } catch (error) {
//     console.error("Login failed:", error.response?.data || error.message);
//   }
// };

// // Logout
// export const logoutUser = () => (dispatch) => {
//   localStorage.removeItem("token"); // remove JWT
//   dispatch(logout()); // clear Redux state
// };

// // Fetch logged-in user info if needed
// export const fetchCurrentUser = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const response = await API.get("/auth/session", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (response.status === 200) {
//       dispatch(setUser(response.data));
//     }
//   } catch (error) {
//     console.error("Fetch user failed:", error.response?.data || error.message);
//   }
// };















// // import { setUser, logout } from "./authSlice";
// // import { API } from "../../helpers/requests";
// // import { PATH } from "../../helpers/constants";

// // // Login with JWT
// // export const loginUser = (userData) => async (dispatch) => {
// //   try {
// //     const response = await API.post(PATH.LOGIN, userData);
// //     if (response.status === 200) {
// //       const token = response.data.token; // JWT from backend
// //       localStorage.setItem("token", token); // save token in localStorage

// //       // Optionally decode token to get user info
// //       const payload = JSON.parse(atob(token.split('.')[1]));
// //       dispatch(setUser(payload)); // set user in Redux
// //     }
// //   } catch (error) {
// //     console.error("Login failed:", error);
// //   }
// // };

// // // Logout by removing JWT
// // export const logoutUser = () => (dispatch) => {
// //   localStorage.removeItem("token"); // remove JWT
// //   dispatch(logout()); // clear Redux state
// // };

// // // Fetch logged-in user info (if needed)
// // export const fetchCurrentUser = () => async (dispatch) => {
// //   try {
// //     const token = localStorage.getItem("token");
// //     if (!token) return;

// //     const response = await API.get(PATH.ME, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });

// //     if (response.status === 200) {
// //       dispatch(setUser(response.data));
// //     }
// //   } catch (error) {
// //     console.error("Fetch user failed:", error);
// //   }
// // };





// // // import { setUser, logout } from "./authSlice";
// // // import { API } from "../../helpers/requests";
// // // import { PATH } from "../../helpers/constants";

// // // export const session = () => async (dispatch) => {
// // //   try {
// // //     const response = await API.get(PATH.SESSION);
// // //     if(response.data._id){
// // //       dispatch(setUser(response.data));
// // //     }
// // //   } catch (error) {
// // //     console.error("Session failed:", error);
// // //   }
// // // };
// // // export const loginUser = (userData) => async (dispatch) => {
// // //   try {
// // //     const response = await API.post(PATH.LOGIN, userData);
// // //     if(response.status === 200){
// // //       dispatch(session());
// // //     }
// // //   } catch (error) {
// // //     console.error("Login failed:", error);
// // //   }
// // // };

// // // export const logoutUser = () => async (dispatch) => {
// // //     try {
// // //         const response = await API.get(PATH.LOGOUT);
// // //         if(response.status === 200){
// // //             dispatch(logout());
// // //         }
// // //     }
// // //     catch (error) {
// // //         console.error("Logout failed:", error);
// // //     }
// // // };
