import css from './AuthActions.module.css';



export default function AuthActions() {
    return (
        <div className={css.authActions}>
              <button type="button" className={css.authButton}>
               LOG IN
              </button>
              <button type="button" className={css.regButton}>
               REGISTRATION
              </button>
        </div>
    );
}