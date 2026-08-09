import css from './AuthActions.module.css';
import Link from "next/link";



export default function AuthActions() {
    return (
        <div className={css.authActions}>
            <Link href="/sign-in">
              <button type="button" className={css.authButton}>
               LOG IN
              </button>
            </Link>
            <Link href="/sign-up">

              <button type="button" className={css.regButton}>
               REGISTRATION
              </button>
            </Link>
        </div>
    );
}