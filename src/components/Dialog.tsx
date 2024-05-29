import {useEffect, useRef} from "react";

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
    <dialog ref={ref} onCancel={onCancel}>
      {children}
      <button onClick={onCancel}>Close</button>
    </dialog>
  );
}
