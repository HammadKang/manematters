"use client";

import { useEffect } from "react";

/** Centered popup with animated tick. Closes on button, backdrop click or Esc. */
export default function SuccessModal({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="animate-fade fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="animate-pop w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF5A7A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path className="draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 id="modal-title" className="mt-5 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-600">{message}</p>
        <button autoFocus onClick={onClose} className="mt-6 rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark">
          Done
        </button>
      </div>
    </div>
  );
}
