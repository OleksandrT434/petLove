"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Header from "@/components/Header/Header";
import AuthHero from "@/components/AuthHero/AuthHero";
import { AuthApi } from "@/lib/api/clientApi";
import { useAuth } from "@/components/AuthContext/AuthContext"

import css from "./page.module.css";

export default function SignUpPage() {
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (value: string) => {
        if (!value) {
            setEmailError("");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Enter a valid Email");
            return;
        }
        setEmailError("");
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
    const data = await AuthApi.signUp({
        name,
        email,
        password,
    });
       localStorage.setItem("token", data.token);
       const currentUser = await AuthApi.getCurrent();
       login(currentUser);
       } catch (requestError) {
       console.error("AUTH ERROR:", requestError);
      }
    };
    return (
        <section className={css.container}>
            <Header variant="default" />
            <div className={css.signUpPage}>
                <div className={css.imageContainer}>
                    <Image
                        src="/shape.svg"
                        alt=""
                        width={530}
                        height={249}
                        className={css.shape}
                    />
                    <Image
                        className={css.image}
                        src="/sign-upMobi.png"
                        alt="Sign Up"
                        width={335}
                        height={280}
                    />
                    <div className={css.authHeroContainer}>
                        <AuthHero
                            animal="🐈"
                            name="Jack"
                            birthday="18.10.2021"
                            description="Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
                        />
                    </div>
                </div>
                <form
                    className={css.form}
                    onSubmit={handleSubmit}>
                    <h1 className={css.title}> Registration</h1>
                    <p className={css.description}>
                        Thank you for your interest in our platform.
                    </p>
                    <div className={css.field}>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />
                    </div>
                    <div className={css.field}>
                        <input
                            className={`${css.input} ${
                                emailError ? css.inputError : ""
                            }`}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => {
                                const value = event.target.value;
                                setEmail(value);
                                validateEmail(value);
                            }}
                            required
                        />
                        {emailError && (
                            <p className={css.error}>
                                {emailError}
                            </p>
                        )}
                    </div>
                    <div className={css.field}>
                        <div className={css.passwordWrapper}>
                            <input
                                className={css.input}
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setError("");
                                }}
                                required
                            />
                            <button
                                type="button"
                                className={css.toggleButton}
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password" }>
                                {showPassword ? (<FaEye />) : ( <FaEyeSlash />)}
                            </button>
                        </div>
                    </div>
                    <div className={css.field}>
                        <div className={css.passwordWrapper}>
                            <input
                                className={css.input}
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(
                                        event.target.value
                                    );
                                    setError("");
                                }}
                                required
                            />
                            <button
                                type="button"
                                className={css.toggleButton}
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prev) => !prev
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"}>
                                {showConfirmPassword ? ( <FaEye /> ) : (<FaEyeSlash />)}
                            </button>
                        </div>
                        {error && (
                            <p className={css.error}>
                                {error}
                            </p>
                        )}
                    </div>
                     <button className={css.registerButton} type="submit"> Registration</button>
                    <p className={css.registerLink}>
                        Already have an account?{" "}
                        <Link className={css.span} href="/sign-in"> Log in </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}