"use client";
import React, { useEffect, useState } from "react";
import "../authStyle.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupUser } from "@/store/auth/authThunk";
import { resetAuthstatus } from "@/store/auth/authSlice";
import toast from "react-hot-toast";

const Page = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { signupStatus, error, message } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		dispatch(resetAuthstatus());
		return () => {
			dispatch(resetAuthstatus());
		};
	}, [dispatch]);

	useEffect(() => {
		if (signupStatus === "success" && !error) {
			toast.success(message);
			router.push("/auth/login");
		} else if ((signupStatus === "fail" || signupStatus === "error") && error) {
			toast.error(error);
		}
	}, [signupStatus, error, router]);

	const [credential, setCrediential] = useState<{
		name: string;
		email: string;
		password: string;
	} | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "email" | "password" | "name"
	) => {
		let value: string = e.target.value;
		setCrediential((prev) => ({
			...{ email: "", name: "", password: "", ...prev },
			[type]: value,
		}));
	};
	const handleSignup = (e: React.FormEvent): void => {
		e.preventDefault();
		if (
			credential?.name != "" &&
			credential?.email != "" &&
			credential?.password != ""
		) {
			credential && dispatch(signupUser(credential!));
		} else {
			toast.error("Please fill all data");
		}
	};
	return (
		<div className="flex min-h-screen">
			<div className=" w-[65%] min-h-screen flex flex-col items-center  justify-center">
				<div className="input_section">
					<div className="name inputContainer">
						<p className="inputLable">User Name</p>
						<input
							className="inputBox"
							type="string"
							value={credential?.name || ""}
							onChange={(e) => handleChange(e, "name")}
							placeholder="Enter your name"
							autoComplete="off"
						/>
					</div>
					<div className="email inputContainer">
						<p className="inputLable">Email</p>
						<input
							className="inputBox"
							type="email"
							value={credential?.email || ""}
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
							value={credential?.password || ""}
							onChange={(e) => handleChange(e, "password")}
							placeholder="Enter password"
							autoComplete="off"
						/>
					</div>

					<button
						className="w-full mt-4 bg-indigo-500  text-white py-2 rounded-md hover:bg-violet-700 transition"
						onClick={(e) => handleSignup(e)}
					>
						Sign Up
					</button>
					<p className="w-full flex  justify-center text-sm font-medium text-gray-700">
						Already a User?{" "}
						<Link href="login" className=" text-indigo-500">
							Login
						</Link>
					</p>
				</div>
			</div>
			<div className="hidden sm:flex  w-[35%] bg-indigo-500 min-h-screen rounded-tl-[130px] rounded-bl-[130px] relative overflow-visible">
				<div className="absolute top-1/2 left-[-6.5rem] -translate-y-1/2 rotate-90 origin-center">
					<h1 className="text-[10vh] sm:text-[12vh] md:text-[14vh] font-bold text-white leading-none tracking-wider whitespace-nowrap">
						SIGNUP
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Page;
