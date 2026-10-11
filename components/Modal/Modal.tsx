"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

import css from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Modal({ onClose, children, className }: ModalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={`${css.modal} ${className || ""}`}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}