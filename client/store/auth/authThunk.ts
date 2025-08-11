import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface SignupPayload {
	name?: string;
	email: string;
	password: string;
}

interface SignupResponse {
	status: string;
	message: string;
}

interface LoginPayload {
	email: string;
	password: string;
}

interface LoginResponse {
	status: string;
	message: string;
	user: {
		name: string;
		email: string;
		id: number;
		token: string;
	};
}

export const signupUser = createAsyncThunk(
	"auth/signup",
	async (userData: SignupPayload, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post<SignupResponse>(
				"auth/signup",
				userData
			);
			return res.data;
		} catch (err: any) {
			const message = handleAxiosError(err);
			return rejectWithValue(message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (loginData: LoginPayload, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post<LoginResponse>(
				"/auth/login",
				loginData
			);
			return res.data;
		} catch (err: any) {
			const message = handleAxiosError(err);
			return rejectWithValue(message);
		}
	}
);
