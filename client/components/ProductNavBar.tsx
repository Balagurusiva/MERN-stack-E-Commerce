"use client";
import { DeviceTabletSpeaker, Monitor } from "phosphor-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

export default function PrdouctNavBar() {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<div className="w-full py-2 flex gap-8 items-center justify-center  px-2 md:px-8    ">
			<div className="flex flex-col items-center">
				<Image src="/mobile-icon.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Mobiles</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/fasion.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Fashion</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/tv.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">TV</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/grocery.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Grocery</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/furniture.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Furniture</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/home-decoration.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Home Decoration</p>
			</div>
			<div className="flex flex-col items-center">
				<Image src="/mixer.webp" alt="mobil" width={52} height={52} />
				<p className="font-semibold text-[12px]">Kitchen</p>
			</div>
		</div>
	);
}
