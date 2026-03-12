"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PasswordInputProps = React.ComponentProps<"input">;

export default function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full rounded-xl border-2 border-[var(--charcoal)]/20 bg-white py-3.5 pl-12 pr-12 font-medium text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal)]/40 focus:border-[var(--charcoal)] focus:ring-2 focus:ring-[var(--charcoal)]/10 ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--charcoal)]/50 hover:text-[var(--charcoal)]"
        tabIndex={-1}
      >
        {show ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
      </button>
    </div>
  );
}
