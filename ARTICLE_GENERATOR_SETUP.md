# 📰 N8N Article Generator Setup Guide

Your form is now configured to send article generation requests to N8N. This guide will help you set up an N8N workflow to receive the form data and generate articles.

## 🎯 What the Form Sends

When a user fills the form and clicks "Generate Article", it sends this JSON to your N8N webhook:

```json
{
  "title": "The Future of AI in 2026",
  "topic": "Artificial Intelligence",
  "style": "professional",
  "length": "medium",
  "keywords": "machine learning, automation, innovation"
}
```

## 🔧 N8N Workflow Setup

### Step 1: Create Webhook Trigger

1. Open N8N (http://localhost:5678)
2. Click **"New"** to create a new workflow
3. Add a **Webhook** trigger node
4. Configure:
   - **HTTP Method**: POST
   - **Path**: `/webhook/article-generator`
5. **Copy the webhook URL** - you'll use this in `.env.local`

### Step 2: Add Processing Node

You have several options to generate articles:

#### Option A: Use OpenAI/LLM Node (Recommended)

1. Add an **OpenAI** or **HTTP Request** node
2. Construct the prompt using form inputs:

```javascript
`Write a ${body.length} article in ${body.style} style about "${body.title}" with topic "${body.topic}". Include these keywords: ${body.keywords}.

Requirements:
- Format: Paragraphs separated by blank lines
- Style: ${body.style}
- Length: ${body.length === "short" ? "300-500" : body.length === "medium" ? "500-1000" : "1000-2000"} words
- Include relevant examples and explanations`;
```

3. Map the response to extract article text

#### Option B: Use Built-in AI Nodes

If your N8N has AI nodes configured, use them directly with the form data

#### Option C: Call External API

Use an HTTP Request node to call:

- OpenAI API
- HuggingFace API
- Your own API

### Step 3: Handle the Response

Add a **Function** node to format the response:

```javascript
// Extract article text from response
const article =
  items[0].json.data?.choices?.[0]?.message?.content ||
  items[0].json.result ||
  items[0].json.text ||
  items[0].json.article;

return {
  article: article,
  title: $input.first().json.title,
  topic: $input.first().json.topic,
  generatedAt: new Date().toISOString(),
};
```

### Step 4: Add Response Node

1. Add a **Respond to Webhook** node
2. Set:
   - **Response Code**: 200
   - **Response Body**: Use the output from the function node

Configure to send back:

```json
{
  "article": "{{ $json.article }}",
  "title": "{{ $json.title }}",
  "topic": "{{ $json.topic }}",
  "generatedAt": "{{ $json.generatedAt }}"
}
```

### Complete Workflow Structure

```
[Webhook Trigger]
      ↓
[OpenAI/LLM Node - Generate Article]
      ↓
[Function Node - Format Response]
      ↓
[Respond to Webhook]
```

## 📝 Example: OpenAI Integration

### Setup OpenAI Node

1. Click "Add Node" → Search "OpenAI"
2. Add OpenAI credential (your API key)
3. Configure:
   - **Model**: gpt-4 or gpt-3.5-turbo
   - **Prompt**:

```javascript
`Write a comprehensive article with these specifications:

Title: ${body.title}
Main Topic: ${body.topic}
Writing Style: ${body.style}
Length: ${body.length === "short" ? "300-500 words" : body.length === "medium" ? "500-1000 words" : "1000-2000 words"}
Keywords to include: ${body.keywords}

Instructions:
1. Create an engaging introduction
2. Develop main sections with relevant information
3. Use examples and case studies where appropriate
4. Write in a ${body.style} tone
5. Include a conclusion
6. Format with clear paragraph breaks

Generate the article now:`;
```

## ✨ Advanced: Adding Enhancements

### Add SEO Metadata

After article generation, add another function node:

```javascript
const article = items[0].json.article;
const title = items[0].json.title;

return {
  article: article,
  title: title,
  metadata: {
    wordCount: article.split(/\s+/).length,
    estimatedReadTime: Math.ceil(article.split(/\s+/).length / 200) + " min",
    seoScore: calculateSEOScore(article, title),
    keywords: items[0].json.keywords,
  },
};
```

### Add Content Improvement

Add a second LLM call to improve the article:

```
[Initial Article Generation]
      ↓
[Review & Improve]
      ↓
[Add SEO Metadata]
      ↓
[Format & Return]
```

### Save to Database

Add a database node to store generated articles:

```
[Generate Article]
      ↓
[Save to Database]
      ↓
[Return Response]
```

## 🧪 Testing Your Workflow

### Test with Webhook Preview

1. In N8N, click the Webhook node
2. Click **"Execute Node"**
3. Send test data:

```json
{
  "title": "The Future of Remote Work",
  "topic": "Work Culture",
  "style": "blog",
  "length": "medium",
  "keywords": "remote work, productivity, collaboration"
}
```

### Test with Form

1. Update `.env.local` with your webhook URL
2. Start the app: `npm run dev`
3. Fill the form and submit
4. Check N8N execution logs

### Test with cURL

```bash
curl -X POST http://localhost:5678/webhook/article-generator \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI in Healthcare",
    "topic": "Healthcare Technology",
    "style": "academic",
    "length": "long",
    "keywords": "AI, diagnosis, treatment, precision medicine"
  }'
```

## 🔗 Connecting to Your App

### Update Environment Variable

In `.env.local`:

```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook/article-generator
NEXT_PUBLIC_N8N_WEBHOOK=/api/webhook
```

### Deploy Steps

1. Get your N8N webhook URL
2. Update `.env.local`
3. Test the full flow
4. Activate the workflow in N8N
5. Start the app: `npm run dev`

## 📊 Response Format

The app expects one of these response formats:

```json
// Option 1: Direct article property
{
  "article": "Your article content here..."
}

// Option 2: Content property
{
  "content": "Your article content here..."
}

// Option 3: Text property
{
  "text": "Your article content here..."
}

// Option 4: Plain text response
"Your article content here..."

// Option 5: Complete metadata
{
  "article": "Your article content...",
  "title": "Article Title",
  "topic": "Topic",
  "metadata": {
    "wordCount": 850,
    "readTime": "4 min"
  }
}
```

## 🚀 Example Workflows

### Quick Start: Simple OpenAI Call

```
Webhook → Function (build prompt) → OpenAI → Function (format) → Response
```

### Advanced: Multi-Step Processing

```
Webhook
  → Validate Input
  → OpenAI (initial draft)
  → Review Node (check quality)
  → Improve Node (enhance)
  → Add Metadata
  → Response
```

### With Database: Persistent Storage

```
Webhook
  → Generate Article
  → Save to Database
  → Return Response
```

## 💡 Tips

1. **Test prompts carefully** - Good prompts = better articles
2. **Use appropriate models** - GPT-4 for quality, GPT-3.5 for speed
3. **Set timeouts** - OpenAI calls can take time
4. **Monitor usage** - Track API costs
5. **Add error handling** - Handle API failures gracefully
6. **Cache responses** - Save generated articles to avoid duplicates

## 🐛 Troubleshooting

### Article not appearing in app

- Check N8N execution logs
- Verify webhook URL in `.env.local`
- Check response format matches expected structure

### OpenAI API errors

- Verify API key is valid
- Check token limits
- Confirm model name is correct

### Workflow not triggered

- Ensure webhook is active
- Check path matches form requests
- Verify HTTP method is POST

## 📚 Next Steps

1. ✅ Set up N8N workflow
2. ✅ Test with sample data
3. ✅ Update `.env.local` with webhook URL
4. ✅ Start the app and test full flow
5. ✅ Customize article generation as needed
6. ✅ Deploy to production

---

Your article generator is ready! Start creating AI-powered content! 🚀
