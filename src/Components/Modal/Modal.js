import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
};
