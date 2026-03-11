/**
 * FAQSection Component
 * 
 * Displays a collapsible FAQ section with multiple questions and answers.
 * Manages which FAQ item is currently open (only one open at a time).
 */

"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--charcoal)] mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQ_ITEMS.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}

