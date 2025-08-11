import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunk";

interface User {
	id: number;
	name: string;
	email: string;
	token: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	loginStatus: string;
	signupStatus: string;
	error: string | null;
	message: string | null;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	loginStatus: "idle",
	signupStatus: "idle",
	error: null,
	message: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuthstatus: (state) => {
			state.loginStatus = "idle";
			state.signupStatus = "idle";
			state.message = null;
			state.error = null;
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.loginStatus = "idle";
			state.signupStatus = "idle";
			state.message = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Signup cases
		builder
			.addCase(signupUser.pending, (state) => {
				state.signupStatus = "loading";
				state.error = null;
				state.message = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.signupStatus = action.payload?.status!;
				if (action.payload?.status === "success") {
					state.message = action.payload.message;
					state.error = null;
				} else {
					state.error = action.payload.message;
					state.message = null;
				}
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.signupStatus = "error";
				state.error = action.payload as string;
				state.message = null;
			});

		// Login cases
		builder
			.addCase(loginUser.pending, (state) => {
				state.loginStatus = "loading";
				state.error = null;
				state.message = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loginStatus = action.payload?.status!;
				if (action.payload?.status === "success") {
					state.message = action.payload.message;
					state.user = action.payload.user;
					state.isAuthenticated = true;
					state.error = null;
				} else {
					state.message = null;
					state.error = action.payload.message;
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loginStatus = "error";
				state.error = action.payload as string;
				state.message = null;
			});
	},
});

export const { logout, resetAuthstatus } = authSlice.actions;
export default authSlice.reducer;
