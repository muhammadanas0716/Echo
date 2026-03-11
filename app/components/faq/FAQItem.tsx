/**
 * FAQItem Component
 * 
 * Individual FAQ accordion item that can be expanded/collapsed.
 * Displays question and answer with smooth animations.
 * Handles its own open/close state.
 */

"use client";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full text-left p-6 rounded-[14px] border-[3px] border-[#000] bg-white shadow-[0px_6px_0_#000] transition-all duration-200 ease hover:translate-y-[-4px] hover:shadow-[0px_10px_0_#000] hover:bg-[var(--mint)]"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-base sm:text-lg font-bold font-heading text-[var(--charcoal)] flex-1">
            {question}
          </span>
          <span
            className={`text-2xl font-bold text-[var(--charcoal)] leading-none transition-transform duration-200 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            +
          </span>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[500px] opacity-100 mt-4"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="p-6 rounded-[14px] border-[3px] border-[#000] bg-white shadow-[0px_6px_0_#000]">
          <p className="text-base text-[var(--charcoal)] opacity-80 leading-relaxed font-medium">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

