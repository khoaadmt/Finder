import React, { useEffect, useState } from "react";
import "./login_page.css";
import { useFormik } from "formik";
import * as Yup from "yup";

var facebook_logo = require("../../../assets/images/facebook-logo.png");
var google_logo = require("../../../assets/images/google-logo.png");

export const Login_page = () => {
    const [isSwitch, setIsSwitch] = useState(false);
    const singInForm = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,14}$/,
                    "password must be 6 - 14 characters and has numeric characters"
                ),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const singUpForm = useFormik({
        initialValues: {
            username: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            displayName: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,14}$/,
                    "password must be 6 - 14 characters and has numeric characters"
                ),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), ""], "passwords must match"),
        }),
        onSubmit: (values) => {},
    });

    const changeForm = (e: any) => {
        e.preventDefault();
        setIsSwitch(!isSwitch);
    };
    useEffect(() => {
        console.log(singInForm.errors.username);
    }, [singInForm.errors.username]);

    return (
        <div className="login-page">
            <div className="main-login-page">
                <div className={`a-container ${isSwitch && "is-txl is-z200"} `}>
                    <form className="form" onSubmit={singUpForm.handleSubmit}>
                        <h2 className="form_title title">Create Account</h2>
                        <input
                            className="form__input "
                            name="username"
                            type="text"
                            placeholder="user name"
                            value={singUpForm.values.username}
                            onChange={singUpForm.handleChange}
                        />
                        {singUpForm.errors.username && (
                            <p className="text-danger">{`*${singUpForm.errors.username}`}</p>
                        )}
                        <div className="py-1"></div>
                        <input
                            className="form__input email"
                            name="displayName"
                            type="text"
                            placeholder="display name"
                            value={singUpForm.values.displayName}
                            onChange={singUpForm.handleChange}
                        />
                        {singUpForm.errors.displayName && (
                            <p className="text-danger">{`*${singUpForm.errors.displayName}`}</p>
                        )}
                        <div className="py-1"></div>
                        <input
                            className="form__input password"
                            name="password"
                            type="password"
                            placeholder="password"
                            value={singUpForm.values.password}
                            onChange={singUpForm.handleChange}
                        />
                        {singUpForm.errors.password && (
                            <p className="text-danger">{`*${singUpForm.errors.password}`}</p>
                        )}
                        <div className="py-1"></div>
                        <input
                            className="form__input password"
                            name="confirmPassword"
                            type="password"
                            placeholder="confirm password"
                            value={singUpForm.values.confirmPassword}
                            onChange={singUpForm.handleChange}
                        />
                        {singUpForm.errors.confirmPassword && (
                            <p className="text-danger">{`*${singUpForm.errors.confirmPassword}`}</p>
                        )}

                        <button className="form__button button submit" type="submit">
                            SIGN UP
                        </button>
                    </form>
                </div>
                <div className={`b-container ${isSwitch && "is-txl"}`}>
                    <form className="form" onSubmit={singInForm.handleSubmit}>
                        <h2 className="title">Sign in to Website</h2>
                        <p>or use your social account</p>
                        <div className="form__icons">
                            <div className="form__icon">
                                <img className="poiter" alt="img" src={facebook_logo} />
                            </div>
                            <div className="form__icon">
                                <img className="poiter" alt="img" src={google_logo} />
                            </div>
                        </div>

                        <input
                            className="form__input"
                            name="username"
                            type="text"
                            placeholder="user name"
                            value={singInForm.values.username}
                            onChange={singInForm.handleChange}
                        />
                        {singInForm.errors.username && (
                            <p className="text-danger">{`*${singInForm.errors.username}`}</p>
                        )}
                        <div className="py-1"></div>
                        <input
                            className="form__input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={singInForm.values.password}
                            onChange={singInForm.handleChange}
                        />
                        {singInForm.errors.password && (
                            <p className="text-danger">{`*${singInForm.errors.password}`}</p>
                        )}

                        <button className="form__button button submit" type="submit">
                            SIGN IN
                        </button>
                    </form>
                </div>
                <div className={isSwitch ? "switch is-gx is-txr" : "switch"} id="switch-cnt">
                    <div className={`switch__circle ${isSwitch && "is-txr"}`}></div>
                    <div className={`switch__circle switch__circle--t ${isSwitch && "is-txr"}`}></div>
                    <div className={`switch__container ${isSwitch && "is-hidden"}`} id="switch-c1">
                        <h2 className="switch__title title">Welcome Back !</h2>
                        <p className="switch__description description">
                            To keep connected with us please login with your personal info
                        </p>
                        <button onClick={changeForm} className="switch__button button switch-btn">
                            SIGN UP
                        </button>
                    </div>
                    <div className={`switch__container ${!isSwitch && "is-hidden"}`} id="switch-c2">
                        <h2 className="switch__title title">Hello Friend !</h2>
                        <p className="switch__description description">
                            Enter your personal details and start journey with us
                        </p>
                        <button onClick={changeForm} className="switch__button button switch-btn">
                            SIGN IN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
