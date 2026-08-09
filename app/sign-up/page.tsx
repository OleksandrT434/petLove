"use client"
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div>
            <h1>Registration</h1>
            <p>Thank you for your interest in our platform.</p>
            <form>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="submit">Registration</button>
                <p>Already have an account? <Link href="/sign-in">Log in</Link></p>
            </form>
        </div>
    )
}