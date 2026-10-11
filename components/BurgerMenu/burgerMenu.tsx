import { useState } from "react";
import css from "./burgerMenu.module.css";
import { IoClose } from "react-icons/io5";
import Navigation from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";
import { useAuth } from "@/components/AuthContext/AuthContext";
import Modal from "@/components/Modal/Modal";

type Props = {
    isMenuOpen?: boolean;
    onClose: () => void;
};

export default function BurgerMenu({onClose, isMenuOpen}: Props)  {
  const { user, logout } = useAuth();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      await logout();
    } finally {
      setIsLogoutConfirmOpen(false);
      onClose();
    }
  };

  return (
    <>
      <aside
          className={`${css.burgerMenu} ${
           isMenuOpen ? css.open : css.closed
          }`}
        > 
        <button type="button"  className={css.closeButton} aria-label="Close menu" onClick={onClose}>
          <IoClose />
        </button>

        <Navigation className={css.burgerNav} />
        <div className={css.actions}>
          {user ? (
            <div className={css.userBlock}>
              <span className={css.userName}>{user.name}</span>
              <button
                type="button"
                className={css.logoutButton}
                onClick={() => setIsLogoutConfirmOpen(true)}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <AuthActions />
          )}
        </div>
      </aside>

      {isLogoutConfirmOpen && (
        <Modal onClose={() => setIsLogoutConfirmOpen(false)}>
          <div className={css.confirmContent}>
            <div className={css.confirmIcon}>?</div>
            <h3 className={css.confirmTitle}>Already leaving?</h3>
            <p className={css.confirmText}>
              Your session will end and you’ll be signed out.
            </p>

            <div className={css.confirmActions}>
              <button
                type="button"
                className={css.confirmYesButton}
                onClick={handleLogoutConfirm}
              >
                Yes
              </button>

              <button
                type="button"
                className={css.confirmCancelButton}
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
