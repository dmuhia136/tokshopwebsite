import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "shared/components/common/Navbar";


const Account: React.FC = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const box = useRef<any>();

	const clickAwayListener = (ref: any) => {
		useEffect(() => {
			const handleClick = (e: any) => {
				if (open && ref.current && ref.current.contains(e.target))
					setOpen((prev: boolean) => (prev ? !prev : prev));
			};
			document.addEventListener("mousedown", handleClick);

			return () => {
				// Cleanup the event listener
				document.removeEventListener("mousedown", handleClick);
			};
		}, [open]);
	};

	clickAwayListener(box);

	return (
		<div className="flex flex-col overflow-x-clip relative">
			<div className="flex sticky w-full left-0 top-0 z-50 shadow-2xl">
			<Navbar />
			</div>
			<div className="" ref={box}>
				<Outlet />
			</div>
		</div>
	);
};

export default Account;
