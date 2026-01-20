import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  selectionLabel?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, isOpen, onToggle, children, icon, selectionLabel }) => {
  return (
    <div className="border border-slate-700 rounded-lg mb-3 overflow-hidden bg-slate-800/50 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
          isOpen ? 'bg-indigo-600/20 text-indigo-300' : 'hover:bg-slate-700/50 text-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <div className="flex flex-col">
             <span className="font-semibold text-lg">{title}</span>
             {!isOpen && selectionLabel && (
                <span className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-md">
                  {selectionLabel}
                </span>
             )}
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-slate-700/50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;