"use client";
import React, { useEffect, useState } from "react";
import "../authStyle.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetAuthstatus } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser } from "@/store/auth/authThunk";

const Page = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { message, error, loginStatus } = useAppSelector((state) => state.auth);
	const [crediential, setCrediential] = useState<{
		email: string;
		password: string;
	} | null>(null);

	useEffect(() => {
		dispatch(resetAuthstatus());
		return () => {
			dispatch(resetAuthstatus());
		};
	}, [dispatch]);

	useEffect(() => {
		if (loginStatus === "success" && !error) {
			toast.success(message);
			router.push("/");
		} else if ((loginStatus === "fail" || loginStatus === "error") && error) {
			toast.error(error);
		}
	}, [loginStatus, error, router, message]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "email" | "password"
	) => {
		let value: string = e.target.value;
		setCrediential((prev) => {
			let safePrev = prev ?? { email: "", password: "" };
			return type === "email"
				? { ...safePrev, email: value }
				: { ...safePrev, password: value };
		});
	};

	const handleLogin = (e: React.FormEvent) => {
		try {
			e.preventDefault();
			if (crediential?.email != "" && crediential?.password != "") {
				dispatch(loginUser(crediential!));
			} else {
				toast.error("Please fill all data");
			}
		} catch (err) {
			console.log("❗️", err);
		}
	};
	return (
		<div className="flex  min-h-screen">
			<div className="hidden sm:flex  w-[35%] bg-indigo-500 min-h-screen rounded-tr-[130px] rounded-br-[130px] relative overflow-visible">
				<div className="absolute top-1/2 right-[-6.5rem] -translate-y-1/2 rotate-270 origin-center">
					<h1 className="text-[10vh] sm:text-[12vh] md:text-[14vh] font-bold text-white leading-none tracking-wider whitespace-nowrap">
						LOGIN
					</h1>
				</div>
			</div>

			<div className=" w-[65%] min-h-screen flex flex-col items-center  justify-center">
				<div className="input_section">
					<div className="email inputContainer">
						<p className="inputLable">Email</p>
						<input
							className="inputBox"
							type="email"
							value={crediential?.email || ""}
							onChange={(e) => handleChange(e, "email")}
							placeholder="Enter email"
							autoComplete="off"
						/>
					</div>

					<div className="password inputContainer">
						<p className="inputLable">Password</p>
						<input
							className="inputBox"
							type="password"
							value={crediential?.password || ""}
							onChange={(e) => handleChange(e, "password")}
							placeholder="Enter password"
							autoComplete="off"
						/>
					</div>

					<button
						className="w-full mt-4 bg-indigo-500  text-white py-2 rounded-md hover:bg-violet-700 transition"
						onClick={(e) => handleLogin(e)}
					>
						Login
					</button>
					<p className="w-full flex  justify-center text-sm font-medium text-gray-700">
						New User?{" "}
						<Link href="signup" className=" text-indigo-500">
							Signup
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Page;
