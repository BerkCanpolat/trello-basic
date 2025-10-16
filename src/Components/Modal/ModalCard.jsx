import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";
import AddForm from "../Form/AddForm";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  exit: { y: 20, opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
};

const ModalCard = ({ isOpen, onClose, setTask }) => {
  const overlayRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        overlayRef.current?.querySelector("[data-autofocus]")?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          ref={overlayRef}
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              ×
            </button>

            <div className="modal-body">
                <AddForm setTask={setTask} onClose={onClose}/>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalCard;
