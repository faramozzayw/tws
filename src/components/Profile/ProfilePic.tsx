import React from "react";
import { User } from "../../types";

import ProfilePicStyle from "./ProfilePic.module.css";

export interface ProfilePic extends Pick<User, "image"> {}

/**
 * Renders the user's picture on the profile page
 */
export const ProfilePic: React.FC<ProfilePic> = ({ image }) => {
	return (
		<div className={ProfilePicStyle.Wrapper}>
			<figure className={`image is-96x96 ${ProfilePicStyle.Figure}`}>
				<img src={image} className={ProfilePicStyle.Image} alt="Profile pic" />
			</figure>
		</div>
	);
};
