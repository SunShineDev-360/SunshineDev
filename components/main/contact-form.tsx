"use client";

import { useState, FormEvent } from "react";

type ContactFormProps = {
  title?: string;
  recipientEmail: string;
  budgetOptions?: string[];
  submitButtonText?: string;
  responseTimeText?: string;
};

export const ContactForm = ({
  title = "Contact me",
  recipientEmail,
  budgetOptions = [],
  submitButtonText = "Send Message",
  responseTimeText = "We typically respond within 24 hours.",
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out this field.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: "",
      });

      // Reset success status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <div className="w-full max-w-[380px]">
      <h3 className="font-bold text-[35px] text-white mb-5">{title}</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name and Email row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="name" className="block text-[13px] text-gray-400 mb-1">
              Name <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
              className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 border border-purple-500/20 rounded-md 
                       text-white text-[13px] placeholder-gray-600 focus:outline-none focus:border-purple-500/50 
                       focus:ring-1 focus:ring-purple-500/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[13px] text-gray-400 mb-1">
              Email <span className="text-purple-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              required
              className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 border border-purple-500/20 rounded-md 
                       text-white text-[13px] placeholder-gray-600 focus:outline-none focus:border-purple-500/50 
                       focus:ring-1 focus:ring-purple-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Company field */}
        <div>
          <label htmlFor="company" className="block text-[13px] text-gray-400 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company (optional)"
            className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 border border-purple-500/20 rounded-md 
                     text-white text-[13px] placeholder-gray-600 focus:outline-none focus:border-purple-500/50 
                     focus:ring-1 focus:ring-purple-500/20 transition-colors"
          />
        </div>

        {/* Budget Range dropdown - only show if options provided */}
        {budgetOptions && budgetOptions.length > 0 && (
          <div>
            <label htmlFor="budget" className="block text-[13px] text-gray-400 mb-1">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 border border-purple-500/20 rounded-md 
                       text-white text-[13px] focus:outline-none focus:border-purple-500/50 
                       focus:ring-1 focus:ring-purple-500/20 transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" className="bg-[#0a0a1a]">
                Select your budget
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option} className="bg-[#0a0a1a]">
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Message field */}
        <div className="relative">
          <label htmlFor="message" className="block text-[13px] text-gray-400 mb-1">
            Message <span className="text-purple-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project, goals, and timeline..."
            required
            rows={4}
            className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 border border-purple-500/20 rounded-md 
                     text-white text-[13px] placeholder-gray-600 focus:outline-none focus:border-purple-500/50 
                     focus:ring-1 focus:ring-purple-500/20 transition-colors resize-none"
          />
          {status === "error" && errorMessage && (
            <div className="absolute right-0 -top-1 px-2 py-1 bg-[#0a0a1a] border border-gray-700 rounded text-xs text-gray-300 shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 
                   text-white font-semibold text-[14px] rounded-md transition-all duration-300 
                   flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
                   shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : status === "success" ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Message Sent!
            </>
          ) : (
            <>
              {submitButtonText}
              <svg className="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </button>

        {/* Response time text */}
        {responseTimeText && (
          <p className="text-center text-[11px] text-gray-500">{responseTimeText}</p>
        )}
      </form>
    </div>
  );
};
