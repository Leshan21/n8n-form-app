# N8N Workflow Setup Guide

## Creating a Simple Echo Workflow (for testing)

This guide will help you create a basic N8N workflow that receives data from the form and returns it.

### Step 1: Create a New Workflow

1. Open N8N at `http://localhost:5678`
2. Click **"New"** or **"Create"** button
3. You'll see a blank canvas

### Step 2: Add Webhook Trigger

1. Click **"Add Node"** or drag a node to the canvas
2. Search for **"Webhook"**
3. Select the **"Webhook" trigger node**
4. Configure:
   - **HTTP Method**: POST
   - **Path**: `/webhook/form-data` (or your preferred path)
5. You'll see the **Webhook URL** displayed - **copy this URL**

### Step 3: Add Processing (Optional)

For this basic example, we'll use a **Function** node to process the data:

1. Click **"Add Node"** (the **+** icon from the Webhook node)
2. Search for **"Function"**
3. Select **"Function" node**
4. Paste this code:

```javascript
// Process the received data
return {
  success: true,
  message: "Data received and processed successfully",
  timestamp: new Date().toISOString(),
  receivedData: {
    name: $json.name,
    email: $json.email,
    documentType: $json.documentType,
    message: $json.message,
  },
  processedAt: new Date().toLocaleString(),
};
```

### Step 4: Add Response Node

1. Click **"Add Node"**
2. Search for **"Respond to Webhook"**
3. Select **"Respond to Webhook" node**
4. Set:
   - **Response Code**: 200
   - **Response Body**:
   ```javascript
   // The function node output will be sent automatically
   ```

Your workflow should look like:

```
[Webhook] → [Function] → [Respond to Webhook]
```

### Step 5: Activate the Workflow

1. Click **"Save"** (Ctrl+S)
2. Give your workflow a name (e.g., "Form Data Processor")
3. Click the **"Activate"** toggle to enable it

### Step 6: Get Your Webhook URL

1. Click on the **Webhook** node
2. Copy the **Full URL** shown (e.g., `http://localhost:5678/webhook/form-data`)
3. Paste it into `.env.local` in the Next.js app:
   ```env
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/form-data
   ```

## Example Workflows

### Example 1: Email Notification

Send an email when form data is received:

```
[Webhook] → [Gmail] → [Respond to Webhook]
```

**Gmail Node Config**:

- Set **To**: defined by form email field
- Set Subject and Body using data from form

### Example 2: Database Storage

Save form data to a database:

```
[Webhook] → [Database] → [Respond to Webhook]
```

**Database Node Config**:

- Select your database type (MySQL, PostgreSQL, etc.)
- Map form fields to database columns

### Example 3: PDF Generation

Generate a PDF from the form data:

```
[Webhook] → [HTTP] → [Respond to Webhook]
```

**HTTP Node Config**:

- Call an external PDF generation API with form data

### Example 4: Multiple Processing

Process data through multiple nodes:

```
[Webhook] → [Function]
           ↓
        [Validate]
           ↓
        [Database]
           ↓
        [Email]
           ↓
        [Respond to Webhook]
```

## Data Structure

The form sends data in this structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "documentType": "pdf",
  "message": "User message content"
}
```

Access in N8N using:

- `$json.name`
- `$json.email`
- `$json.documentType`
- `$json.message`

## Response Format

The webhook expects a JSON response. Good examples:

### Success Response

```json
{
  "success": true,
  "message": "Process completed",
  "data": {
    "processedAt": "2024-01-15T10:30:00Z",
    "documentId": "DOC-12345"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Invalid email format",
  "details": "Email validation failed"
}
```

## Testing Your Workflow

### Method 1: Using the Test Button

1. Open your workflow in N8N
2. Click **"Test Workflow"**
3. Click **"Execute Node"** on the Webhook node
4. The workflow will execute

### Method 2: Using cURL

```bash
curl -X POST http://localhost:5678/webhook/form-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "documentType": "pdf",
    "message": "Test message"
  }'
```

### Method 3: Using the Form App

1. Start the Next.js app: `npm run dev`
2. Fill in the form
3. Click "Send to N8N"
4. Check the output panel for the response
5. Check N8N execution logs for workflow details

## Debugging

### Check Execution Logs

1. In N8N, click **"Executions"** in the left sidebar
2. Click on any execution to see details
3. Check for errors in individual nodes

### Common Issues

| Issue             | Solution                                            |
| ----------------- | --------------------------------------------------- |
| Webhook not found | Check the URL path is correct                       |
| CORS error        | Use the API proxy (default in the app)              |
| No response       | Ensure "Respond to Webhook" node is present         |
| Invalid JSON      | Check Function node returns valid JavaScript object |

## Advanced Features

### Conditional Logic

Use an **IF** node to route data based on conditions:

```
[Webhook] → [IF] → [Path A: condition true]
              ↓
          [Path B: condition false]
```

### Error Handling

Add an **Error Handler** node to catch and log errors:

```
[Webhook] → [Function] → [Error Handler] → [Respond to Webhook]
```

### Data Transformation

Use **mappings** and Lodash functions:

```javascript
// Transform array of items
return $json.items.map((item) => ({
  id: item.id,
  uppercaseName: item.name.toUpperCase(),
}));
```

## Environment Variables in N8N

If you need API keys or credentials:

1. In N8N, go to **Settings** → **Credentials**
2. Create new credentials for services (Gmail, Database, etc.)
3. Reference in nodes using `{{ $credentials.YOUR_CREDENTIAL_NAME }}`

## Deploying N8N Workflow

### Local N8N

```bash
npm start
# or
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
```

### Self-Hosted

- Install N8N server on your infrastructure
- Update webhook URL in `.env.local`

### N8N Cloud

- Use N8N.cloud hosted service
- Webhook URLs are provided automatically

## Resources

- **N8N Nodes Library**: https://docs.n8n.io/nodes
- **N8N Expressions**: https://docs.n8n.io/code/expressions
- **Function Node Guide**: https://docs.n8n.io/nodes/n8n-nodes-core-function
- **Webhook Node**: https://docs.n8n.io/nodes/n8n-nodes-core-webhook

---

Your workflow is now ready to receive data from the form! 🎉
