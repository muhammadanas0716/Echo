/**
 * Toast Component
 * 
 * Displays temporary notification messages (success/error).
 * Auto-dismisses after 5 seconds.
 * Can be manually closed via the close button.
 * Used for form submission feedback and other user notifications.
 */

"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast-notification ${type === "success" ? "toast-success" : "toast-error"}`}
      role="alert"
    >
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button
          onClick={onClose}
          className="toast-close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

