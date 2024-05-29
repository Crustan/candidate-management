import {useEffect, useRef} from "react";
import css from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onCancel: () => void;
}

export function Dialog({isOpen, onCancel, children}: React.PropsWithChildren<DialogProps>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} onCancel={onCancel} className={css.dialog}>
      <div className={css.dialogContent}>
        <button onClick={onCancel} className="button small">
          Close
        </button>
        {children}
      </div>
    </dialog>
  );
}
