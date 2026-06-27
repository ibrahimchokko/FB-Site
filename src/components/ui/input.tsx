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

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>
      <input className={`${BASE} ${error ? "border-red-500 focus:ring-red-400" : ""} ${className}`} {...props} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>
      <textarea
        rows={4}
        className={`${BASE} resize-none ${error ? "border-red-500 focus:ring-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function Select({
  label,
  error,
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>
      <select className={`${BASE} ${error ? "border-red-500" : ""} ${className}`} {...props}>
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
