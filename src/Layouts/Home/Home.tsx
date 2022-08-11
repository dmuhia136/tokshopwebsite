import Topbar from "shared/components/common/Topbar"
import { Outlet } from "react-router-dom";
import Cart from "modules/Cart/views/Cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import Menu from "shared/components/common/Menu";
import { cartOpen } from "shared/recoil/cart";
import { menuOpen } from "shared/recoil/menu";

const Home = () => {
	const cartState = useRecoilValue(cartOpen);
	const setCartOpen = useSetRecoilState(cartOpen);
	const menuState = useRecoilValue(menuOpen);
	const setMenuOpen = useSetRecoilState(menuOpen);

	const box = useRef<any>();
	const clickAwayListener = (ref: any) => {
		useEffect(() => {
			const handleClick = (e: any) => {
				if (cartState && ref.current && ref.current.contains(e.target))
					setCartOpen((prev: boolean) => (prev ? !prev : prev));
				else if (menuState && ref.current && ref.current.contains(e.target))
					setMenuOpen((prev: boolean) => (prev ? !prev : prev));
			};
			document.addEventListener("mousedown", handleClick);

			return () => {
				// Cleanup the event listener
				document.removeEventListener("mousedown", handleClick);
			};
		}, [cartState, menuState]);
	};

	clickAwayListener(box);

	return (
		<div
			className="flex flex-col flex-nowrap overflow-x-clip">
			<div className="fixed top-0 inset-x-0 z-50 bg-white">
				<Topbar />
            {/* <Black /> */}
			</div>

			<div className="relative">
				<div
					className={`${
						cartState
							? "fixed right-0 top-14 bg-white min-h-max  z-[44] shadow-2xl rounded-xl"
							: "hidden"
					}`}>
					<Cart />
				</div>
				<div
					onBlur={() => setMenuOpen((prev: boolean) => !prev)}
					className={`${
						menuState ? "fixed right-0 top-14 bg-white z-[44] shadow-2xl" : "hidden"
					}`}>
					<Menu setMenuOpen={setMenuOpen} />
				</div>

				<div ref={box} className="bg-teal-50 pt-24 min-h-screen">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Home;
