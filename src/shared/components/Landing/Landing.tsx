import React from "react";
import Hero from "./Hero";
import Products from "../products/HomeProducts";
import Rooms from "../rooms/Rooms";
import PopularShops from "../shops/PopularShops";
import Upcoming from "../Upcoming/Upcoming";

const Landing = () => {
	return (
		<>
			<Hero />
         <Upcoming />
			<PopularShops />
			<Products />
			<Rooms />
		</>
	);
};

export default Landing;
