import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory, Redirect } from "react-router-dom";
import * as Yup from "yup";
import {
	Button,
	Control,
	Title,
	Buttons,
	Hero,
	Field,
} from "@faramo.zayw/reabulma";

import Styles from "./AuthForm.module.css";

import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { useAuthState } from "../hooks/auth";
import { useLoginMutation } from "./../types/graphql";
import { $ } from "./../utils";
import { password, username } from "../validation-subsets";
import { InputField } from "../components/Profile";
import { PasswordInput } from "../components/InputField";

const LoginSchema = Yup.object().shape({
	username,
	password,
});

export const Login = () => {
	const history = useHistory();
	useLayoutEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const { login, isAuthenticated } = useAuthState();

	const [loginQuery, { loading }] = useLoginMutation({
		onCompleted: ({ login: jwt }) => {
			login(jwt);
			addNotification({
				type: "success",
				message: "Login was successful 🌈 \n ~ ~ Redirect to home page ~ ~",
			});
			history.push("/");
		},
		onError: (e) => {
			console.error(e);
			addNotification({
				type: "danger",
				message: "Access denied.",
			});
		},
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validateOnChange: true,
		validateOnMount: true,
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			loginQuery({
				variables: { data: { ...values } },
			});
		},
	});

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Hero isColor="dark" isFullHeight className={Styles.AuthFormWrapper}>
			<form
				onSubmit={formik.handleSubmit}
				onReset={() => formik.resetForm()}
				className={Styles.AuthForm}
			>
				<Title className={Styles.AuthFormTitle}>Login</Title>
				<hr className={Styles.Divider} />
				<fieldset disabled={loading}>
					<InputField
						description="Username"
						onChange={formik.handleChange}
						value={formik.values.username}
						min="2"
						max="25"
						type="text"
						name="username"
						placeholder="Input username"
						autoFocus
						required
					/>
					<PasswordInput
						description="Password"
						value={formik.values.password}
						onChange={formik.handleChange}
						hepler={formik.errors.password}
						min="10"
						max="50"
						name="password"
						autoComplete="current-password"
						placeholder="Input password"
						required
					/>
					<Field className="is-grouped">
						<Control>
							<Buttons>
								<Button
									isColor="success"
									type="submit"
									isOutlined
									isLoading={loading}
								>
									Submit
								</Button>
								<Button isColor="warning" type="reset" isOutlined>
									Reset
								</Button>
							</Buttons>
						</Control>
					</Field>
					<GoogleAuth />
				</fieldset>
				<br />
				<Link to="/signup" className="has-text-info">
					have not account yet?
				</Link>
			</form>
		</Hero>
	);
};
