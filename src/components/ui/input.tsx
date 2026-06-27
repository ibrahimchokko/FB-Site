import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const BASE =
  "w-full rounded-[var(--radius-btn)] border border-(--border) bg-(--surface) px-3 py-2.5 text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)] disabled:opacity-50 transition-shadow";

export function Input({ label, error, className = "", id: idProp, ...props }: InputProps) {
  const uid = useId();
  const id  = idProp ?? uid;
  const errId = `${id}-err`;
  return (
    <div className="block space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-(--foreground)">{label}</label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${BASE} ${error ? "border-red-500 focus:ring-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <span id={errId} role="alert" className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, className = "", id: idProp, ...props }: TextareaProps) {
  const uid = useId();
  const id  = idProp ?? uid;
  const errId = `${id}-err`;
  return (
    <div className="block space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-(--foreground)">{label}</label>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${BASE} resize-none ${error ? "border-red-500 focus:ring-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <span id={errId} role="alert" className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Select({
  label,
  error,
  className = "",
  id: idProp,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  const uid = useId();
  const id  = idProp ?? uid;
  const errId = `${id}-err`;
  return (
    <div className="block space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-(--foreground)">{label}</label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${BASE} ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span id={errId} role="alert" className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
