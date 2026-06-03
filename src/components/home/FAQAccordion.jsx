"use client";

import { faqItems } from "../data/data";
import { useState } from "react";

function FAQAccordion() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold text-text-primary">
            Quick Answers
          </h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <button
              key={faq.id}
              type="button"
              onClick={() =>
                setOpenId((prev) => (prev === faq.id ? null : faq.id))
              }
              className="w-full rounded-2xl bg-background p-5 text-left shadow-sm"
            >
              <div className="flex items-center justify-between text-lg font-semibold text-text-primary">
                {faq.question}
                <i
                  className={`fa-solid fa-chevron-${
                    openId === faq.id ? "up" : "down"
                  } text-sm text-primary`}
                ></i>
              </div>
              {openId === faq.id && (
                <p className="mt-3 text-sm text-text-secondary">{faq.answer}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;
