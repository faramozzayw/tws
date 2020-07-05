import React from "react";
import { Link } from "react-router-dom";

import { Button } from "./../bulma";

export const MainNavbar = () => {
	return (
		<nav
			className="navbar is-dark"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<a
					role="button"
					className="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">
					<Link to="/" className="navbar-item">
						Home
					</Link>

					<Link to="/docs" className="navbar-item">
						Documentation
					</Link>

					<Link to="/editor" className="navbar-item">
						Start edit
					</Link>
				</div>
			</div>

			<div className="navbar-end">
				<div className="navbar-item">
					<div className="buttons">
						<Button isOutlined isColor="success">
							<strong>Sign up</strong>
						</Button>
						<Button isOutlined isColor="info">
							Log in
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};
