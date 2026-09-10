import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  children,
  onClick,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-200 outline-none select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-navy text-white hover:bg-navy-light shadow-sm active:scale-[0.98]",
    luxury: "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold shadow-glow hover:brightness-110",
    gold: "bg-gold text-navy-950 font-semibold hover:bg-gold-light shadow-sm",
    outline: "border border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-800 backdrop-blur-sm",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
    darkGlass: "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    default: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5 font-semibold",
    icon: "h-10 w-10 p-0 rounded-xl"
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ y: disabled ? 0 : -1 }}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
