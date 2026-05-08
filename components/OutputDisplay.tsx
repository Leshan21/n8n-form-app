"use client";

interface OutputDisplayProps {
  output: string | null;
  loading: boolean;
  error: string | null;
}

export function OutputDisplay({ output, loading, error }: OutputDisplayProps) {
  // Try to parse JSON response and extract article content
  const getArticleContent = () => {
    try {
      const data = typeof output === "string" ? JSON.parse(output) : output;
      // Support various response formats
      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        return (
          firstItem?.output ||
          firstItem?.article ||
          firstItem?.content ||
          firstItem?.text ||
          output
        );
      }

      return data.article || data.output || data.content || data.text || output;
    } catch {
      return output;
    }
  };

  const getArticleTitle = (content: string) => {
    const firstLine = content
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (!firstLine) {
      return "Generated Article";
    }

    if (firstLine.startsWith("## ")) {
      return firstLine.replace(/^##\s+/, "");
    }

    if (firstLine.startsWith("### ")) {
      return firstLine.replace(/^###\s+/, "");
    }

    return firstLine;
  };

  const renderArticleContent = (content: string) => {
    const lines = content.split("\n");
    const blocks: Array<{
      type: "title" | "heading2" | "heading3" | "paragraph" | "list";
      text: string;
    }> = [];

    let paragraphBuffer: string[] = [];
    let isFirstBlock = true;

    const flushParagraph = () => {
      const paragraph = paragraphBuffer.join(" ").trim();
      if (paragraph) {
        blocks.push({ type: isFirstBlock ? "title" : "paragraph", text: paragraph });
        isFirstBlock = false;
      }
      paragraphBuffer = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line) {
        flushParagraph();
        continue;
      }

      if (line.startsWith("## ")) {
        flushParagraph();
        blocks.push({ type: "heading2", text: line.replace(/^##\s+/, "") });
        isFirstBlock = false;
        continue;
      }

      if (line.startsWith("### ")) {
        flushParagraph();
        blocks.push({ type: "heading3", text: line.replace(/^###\s+/, "") });
        isFirstBlock = false;
        continue;
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        flushParagraph();
        blocks.push({ type: "list", text: line.replace(/^[-*]\s+/, "") });
        isFirstBlock = false;
        continue;
      }

      paragraphBuffer.push(line);
    }

    flushParagraph();

    return blocks.map((block, idx) => {
      if (block.type === "title") {
        return (
          <h1 key={idx} className="mb-6 text-2xl md:text-4xl font-semibold tracking-tight text-white">
            {block.text}
          </h1>
        );
      }

      if (block.type === "heading2") {
        return (
          <h2 key={idx} className="mt-8 mb-4 text-xl md:text-2xl font-semibold text-white">
            {block.text}
          </h2>
        );
      }

      if (block.type === "heading3") {
        return (
          <h3 key={idx} className="mt-6 mb-3 text-lg md:text-xl font-semibold text-sky-300">
            {block.text}
          </h3>
        );
      }

      if (block.type === "list") {
        return (
          <div key={idx} className="mb-3 flex items-start gap-3 text-sm md:text-base leading-7 text-gray-300">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
            <p>{block.text}</p>
          </div>
        );
      }

      return (
        <p key={idx} className="mb-4 text-sm md:text-base leading-7 text-gray-300">
          {block.text}
        </p>
      );
    });
  };

  const articleContent = output ? getArticleContent() : null;
  const articleTitle = articleContent ? getArticleTitle(articleContent) : "Generated Article";
  const articleWordCount = articleContent ? String(articleContent).split(/\s+/).filter(Boolean).length : 0;
  const articleSizeKb = articleContent ? (String(articleContent).length / 1024).toFixed(2) : "0.00";

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur-xl opacity-50"></div>

      <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full flex flex-col min-h-[500px]">
        {/* Output Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Generated Article
          </h2>
          <p className="text-gray-400 text-sm">
            Your AI-generated content is ready
          </p>
        </div>

        {/* Output Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-1 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-300">Waiting for response...</p>
                <p className="text-gray-500 text-sm mt-2">
                  Processing your request
                </p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="flex items-start gap-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-red-400 font-semibold">Error</h3>
                <p className="text-red-300 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {output && !loading && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Article Display */}
              <div className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                {/* Article Header */}
                <div className="bg-slate-700/50 border-b border-slate-600 px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80 mb-1">
                      Article Preview
                    </p>
                    <span className="block text-sm font-medium text-gray-200 truncate">
                      {articleTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(articleContent || "")
                      }
                      className="p-2 hover:bg-slate-600 rounded transition text-gray-400 hover:text-gray-200"
                      title="Copy article"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-2 hover:bg-slate-600 rounded transition text-gray-400 hover:text-gray-200"
                      title="Print article"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2zm0 0h2a2 2 0 002-2v-4m0 0V5a2 2 0 00-2-2H9.172a2 2 0 00-1.414.586L5.586 9A2 2 0 005 10.172V19a2 2 0 002 2h10a2 2 0 002-2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Article Content */}
                <div className="flex-1 overflow-auto p-6 prose prose-invert max-w-none text-gray-100">
                  <div className="prose prose-invert prose-sm max-w-none">
                    {/* Parse markdown/text content */}
                    {typeof articleContent === "string" ? (
                      <div className="font-sans">
                        {renderArticleContent(articleContent)}
                      </div>
                    ) : (
                      <div className="text-gray-300">
                        {JSON.stringify(articleContent, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Word Count</p>
                  <p className="text-white font-semibold">{articleWordCount}</p>
                </div>
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Content Size</p>
                  <p className="text-white font-semibold">{articleSizeKb} KB</p>
                </div>
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Status</p>
                  <p className="text-green-400 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {!output && !loading && !error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-400">No article yet</p>
                <p className="text-gray-600 text-sm mt-2">
                  Fill the form and click "Generate Article" to create content
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
