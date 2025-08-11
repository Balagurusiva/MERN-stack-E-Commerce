"use client";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAuthRoute = pathname.startsWith("/auth");
	return (
		<>
			{!isAuthRoute && <NavBar />}
			{children}
		</>
	);
}
