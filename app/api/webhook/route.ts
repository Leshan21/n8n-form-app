import { NextRequest, NextResponse } from "next/server";

type ForwardResult = {
  ok: boolean;
  status: number;
  statusText: string;
  data?: unknown;
  details?: string;
};

async function forwardToN8n(
  url: string,
  body: unknown,
): Promise<ForwardResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let details = "";

    try {
      const errorJson = await response.json();
      details =
        errorJson?.message ||
        errorJson?.error ||
        JSON.stringify(errorJson) ||
        "";
    } catch {
      try {
        details = await response.text();
      } catch {
        details = "";
      }
    }

    return {
      ok: false,
      status: response.status,
      statusText: response.statusText,
      details,
    };
  }

  try {
    const data = await response.json();
    return {
      ok: true,
      status: response.status,
      statusText: response.statusText,
      data,
    };
  } catch {
    const text = await response.text();
    return {
      ok: true,
      status: response.status,
      statusText: response.statusText,
      data: text,
    };
  }
}

function toTestWebhookUrl(url: string): string | null {
  if (url.includes("/webhook-test/")) {
    return null;
  }

  if (url.includes("/webhook/")) {
    return url.replace("/webhook/", "/webhook-test/");
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Replace this with your actual N8N webhook URL
    const n8nWebhookUrl =
      process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/test";

    // First attempt: production webhook URL.
    const primary = await forwardToN8n(n8nWebhookUrl, body);
    if (primary.ok) {
      return NextResponse.json(primary.data, { status: 200 });
    }

    // Fallback attempt: matching test webhook URL for workflows in listen mode.
    const testUrl = toTestWebhookUrl(n8nWebhookUrl);
    if (primary.status === 404 && testUrl) {
      const fallback = await forwardToN8n(testUrl, body);
      if (fallback.ok) {
        return NextResponse.json(fallback.data, { status: 200 });
      }

      return NextResponse.json(
        {
          error: [
            `N8N error (${fallback.status}): ${fallback.statusText}`,
            `Primary URL failed: ${n8nWebhookUrl}`,
            primary.details,
            `Fallback URL failed: ${testUrl}`,
            fallback.details,
            "Hint: Activate your workflow for /webhook/... OR click Execute/Listen in n8n for /webhook-test/...",
          ]
            .filter(Boolean)
            .join(" | "),
        },
        { status: fallback.status },
      );
    }

    return NextResponse.json(
      {
        error: [
          `N8N error (${primary.status}): ${primary.statusText}`,
          primary.details,
          `URL: ${n8nWebhookUrl}`,
          primary.status === 404
            ? "Hint: In n8n, ensure the webhook path exists and either activate the workflow for /webhook/... or run webhook test mode for /webhook-test/..."
            : "",
        ]
          .filter(Boolean)
          .join(" | "),
      },
      { status: primary.status },
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Optional: Handle GET requests
export async function GET() {
  return NextResponse.json(
    { message: "Webhook endpoint ready" },
    { status: 200 },
  );
}
