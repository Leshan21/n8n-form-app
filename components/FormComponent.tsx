"use client";

import { useState } from "react";

interface FormComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  isLoading: boolean;
}

export function FormComponent({ onSubmit, isLoading }: FormComponentProps) {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    style: "professional",
    length: "medium",
    keywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50"></div>

      <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Generate Article
          </h2>
          <p className="text-gray-400">
            Provide details and we'll generate a unique article for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., The Future of AI in 2026"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
            />
          </div>

          {/* Topic Field */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Main Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., Artificial Intelligence, Technology, Business"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
            />
          </div>

          {/* Writing Style Select */}
          <div>
            <label
              htmlFor="style"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Writing Style
            </label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition appearance-none cursor-pointer"
            >
              <option value="professional">Professional</option>
              <option value="blog">Blog/Casual</option>
              <option value="technical">Technical</option>
              <option value="academic">Academic</option>
            </select>
          </div>

          {/* Article Length Select */}
          <div>
            <label
              htmlFor="length"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Article Length
            </label>
            <select
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition appearance-none cursor-pointer"
            >
              <option value="short">Short (300-500 words)</option>
              <option value="medium">Medium (500-1000 words)</option>
              <option value="long">Long (1000-2000 words)</option>
            </select>
          </div>

          {/* Keywords Field */}
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Keywords (comma separated)
            </label>
            <textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="e.g., machine learning, automation, future trends"
              disabled={isLoading}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Article...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
                  />
                </svg>
                Generate Article
              </>
            )}
          </button>
        </form>

        {/* Form Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Your article will be generated using AI and delivered shortly
        </p>
      </div>
    </div>
  );
}
