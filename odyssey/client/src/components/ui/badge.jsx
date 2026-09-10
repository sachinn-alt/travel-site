import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-100 text-slate-800",
    gold: "bg-amber-100 text-amber-900 border border-amber-300 font-semibold",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cyan: "bg-sky-50 text-sky-700 border border-sky-200",
    outline: "border border-slate-200 text-slate-700",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/30"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
