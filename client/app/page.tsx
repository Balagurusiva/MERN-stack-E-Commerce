"use client";
import NavBar from "@/components/NavBar";
import PrdouctNavBar from "@/components/ProductNavBar";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
	const auth = useSelector((state: RootState) => state.auth);
	return (
		<div className="">
			<PrdouctNavBar />
		</div>
	);
}
