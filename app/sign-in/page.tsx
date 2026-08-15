"use client"
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import css from "./page.module.css";

export default function SignInPage() {
    return (
    
        <section className={css.container}>
            <Header variant="default" />
            <div className={css.signInPage}>
              <div className={css.imageContainer}>
                 <Image className={css.image} src="/sign-inMob.png" alt="Sign In" width={335} height={280} />
               </div>
               <form className={css.form} action="/api/sign-in" method="POST">
                 <h1 className={css.title}>Log in</h1>
                   <p className={css.description}>Welcome! Please enter your credentials to login to the platform:</p>
                <div className={css.inputContainer}>
                <input className={css.input} type="email" placeholder="Email" required />
                <input className={css.input} type="password" placeholder="Password" required />
                </div>
                <button className={css.loginButton} type="submit">LOG IN</button>
                <p className={css.registerLink}>Don’t have an account? <Link className={css.span} href="/sign-up">Register</Link></p>
            </form>
            </div>
        </section>
    )
}