"use client";

import React, { useState } from "react";

const faqData = [
  {
    question: "Do I need to book in advance?",
    answer: "Yes, we recommend booking ahead to ensure availability at your preferred time.",
  },
  {
    question: "What products do you use?",
    answer: "We use high-quality, cruelty-free, and salon-grade products for all services.",
  },
  {
    question: "Do you offer bridal or group packages?",
    answer: "Yes! We have special packages for weddings and events. Contact us for details.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer: "Yes, you can cancel or reschedule up to 24 hours before your appointment.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-200 transition-all duration-300"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-rose-600 py-4"
          >
            <span>{item.question}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-rose-600" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 pb-4 pr-2">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
