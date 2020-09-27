import React from "react";

import { Hero, HeroBody } from "@faramo.zayw/reabulma";
import { MainNavbar } from "../components";

export const Layout: React.FC<HeroBody<HTMLElement>> = ({
	children,
	...props
}) => (
	<div>
		<MainNavbar />
		<Hero isColor="dark" isFullHeight>
			<HeroBody {...props}>{children}</HeroBody>
		</Hero>
	</div>
);
