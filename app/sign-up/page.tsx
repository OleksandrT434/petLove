"use client"
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import css from "./page.module.css";

export default function SignUpPage() {
    return (
        <section className={css.container}>
            <Header variant="default" />
            <div className={css.signUpPage}>
                <div className={css.imageContainer}> 
                    <Image className={css.image} src="/sign-upMobi.png" alt="Sign Up" width={335} height={280} />
                </div>
                <form className={css.form} action="/api/sign-up" method="POST">
                    <h1 className={css.title}>Registration</h1>
                    <p className={css.description}>Thank you for your interest in our platform.</p>
                    <input className={css.input} type="text" placeholder="Name" required />
                    <input className={css.input} type="email" placeholder="Email" required />
                    <input className={css.input} type="password" placeholder="Password" required />
                    <input className={css.input} type="password" placeholder="Confirm Password" required />
                    <button className={css.registerButton} type="submit">Registration</button>
                    <p className={css.registerLink}>Already have an account? <Link className={css.span} href="/sign-in">Log in</Link></p>
                </form>
            </div>
        </section>
    )
}