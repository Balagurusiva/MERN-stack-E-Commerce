"use client";
import { Heart, List, ShoppingCartSimple } from "phosphor-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function NavBar() {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<div className="w-full h-[3rem] flex justify-between items-center px-2 md:px-4  shadow-md relative top-0">
			{/* Left Section */}
			<div className="flex flex-row gap-2 items-center">
				<Link className="text-[21px] sm:text-2xl font-bold" href={"/"}>
					BUYIT
				</Link>
			</div>

			{/* Right Section */}
			<div className="flex flex-row gap-4 items-center relative">
				<div className="flex flex-row items-center gap-1">
					<Heart size={24} />
					<p className="hidden sm:flex">Wishlists</p>
				</div>
				<div className="flex flex-row items-center gap-1">
					<ShoppingCartSimple size={24} />
					<p className="hidden sm:flex">Cart</p>
				</div>
				<p className="">{user?.name ? user.name : "Login"}</p>
			</div>
		</div>
	);
}
