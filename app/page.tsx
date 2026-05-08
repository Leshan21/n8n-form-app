"use client";

import { useState } from "react";
import { FormComponent } from "@/components/FormComponent";
import { OutputDisplay } from "@/components/OutputDisplay";

export default function Home() {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      // Send to your n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK || "/api/webhook";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let details = "";

        try {
          const errorJson = await response.json();
          details =
            errorJson?.error ||
            errorJson?.message ||
            JSON.stringify(errorJson) ||
            "";
        } catch {
          try {
            details = await response.text();
          } catch {
            details = "";
          }
        }

        throw new Error(
          details ||
            `Webhook error (${response.status}): ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Handle article/text response - can be string or JSON
      if (typeof data === "string") {
        setOutput(data);
      } else if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];

        if (typeof firstItem === "string") {
          setOutput(firstItem);
        } else if (firstItem?.output) {
          setOutput(firstItem.output);
        } else if (firstItem?.article) {
          setOutput(firstItem.article);
        } else if (firstItem?.content) {
          setOutput(firstItem.content);
        } else if (firstItem?.text) {
          setOutput(firstItem.text);
        } else {
          setOutput(JSON.stringify(data, null, 2));
        }
      } else if (data.article) {
        setOutput(data.article);
      } else if (data.output) {
        setOutput(data.output);
      } else if (data.content) {
        setOutput(data.content);
      } else if (data.text) {
        setOutput(data.text);
      } else {
        // Fallback to JSON for other formats
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI Article Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create unique, high-quality articles powered by AI. Just provide
            your topic and let us generate the content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <div>
            <FormComponent onSubmit={handleFormSubmit} isLoading={loading} />
          </div>

          {/* Output Section */}
          <div>
            <OutputDisplay output={output} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
