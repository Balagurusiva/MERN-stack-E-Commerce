import { AxiosError } from "axios";

export function handleAxiosError(err: unknown): string {
	const axiosError = err as AxiosError<any>;

	// Try common locations for error messages
	const message =
		axiosError?.response?.data?.message ||
		axiosError?.response?.data?.error ||
		axiosError?.message ||
		"Something went wrong";

	console.log("❗️ API Error:", message);
	return message;
}
