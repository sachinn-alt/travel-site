import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Tabs = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-5 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 border-none cursor-pointer outline-none",
              isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-normal", isActive ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-600")}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
