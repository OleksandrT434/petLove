"use client"
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import css from "./page.module.css";
import AuthHero from "@/components/AuthHero/AuthHero";
import { useState } from "react"; 
import { useAuth } from "@/components/AuthContext/AuthContext"
import { AuthApi } from "@/lib/api/clientApi";


export default function SignInPage() {

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>) => {event.preventDefault();
    setError("");
    try {
        const data = await AuthApi.signIn({
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        const currentUser = await AuthApi.getCurrent();
        login(currentUser);
    } catch (requestError) {
        console.error("SIGN IN ERROR:", requestError);
        setError("Invalid email or password");
    }
};

    return (
    
        <section className={css.container}>
            <Header variant="default" />
            <div className={css.signInPage}>
              <div className={css.imageContainer}>
                 <Image
                       src="/shape.svg"
                       alt=""
                       width={530}
                       height={249}
                       className={css.shape}
                      />
                 <Image className={css.image} src="/sign-inMob.png" alt="Sign In" width={335} height={280} />
                        <div className={css.authHeroContainer}>
                           <AuthHero animal="🐶" name="Rich" birthday="21.09.2020" description="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"  />
                        </div>            
               </div>
               <form className={css.form} onSubmit={handleSubmit}>
                 <h1 className={css.title}>Log in</h1>
                   <p className={css.description}>Welcome! Please enter your credentials to login to the platform:</p>
                <div className={css.inputContainer}>
                <input className={css.input} type="email" placeholder="Email"
                       value={email}
                       onChange={(event) => setEmail(event.target.value)} 
                       required />
                <input className={css.input} type="password" placeholder="Password" 
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}
                       required />
                </div>
                <button className={css.loginButton} type="submit">LOG IN</button>
                <p className={css.registerLink}>Don’t have an account? <Link className={css.span} href="/sign-up">Register</Link></p>
            </form>
            </div>
        </section>
    )
}