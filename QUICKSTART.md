# Quick Setup Guide

## 🚀 Getting Started

### 1. Configure Your N8N Webhook

First, you need to set up your N8N webhook. Update `.env.local`:

```bash
# Replace with your actual N8N webhook URL
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-workflow-name
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Test the Form

1. Fill in the form fields (Name, Email, Document Type, Message)
2. Click "Send to N8N" button
3. Watch the output panel for the response

## 📝 Environment Variables

| Variable                  | Required | Description                                          |
| ------------------------- | -------- | ---------------------------------------------------- |
| `N8N_WEBHOOK_URL`         | Yes      | Your N8N webhook endpoint URL                        |
| `NEXT_PUBLIC_N8N_WEBHOOK` | No       | Client-side webhook URL (defaults to `/api/webhook`) |

### Option A: Using API Proxy (Recommended)

- Keep `NEXT_PUBLIC_N8N_WEBHOOK=/api/webhook`
- Set `N8N_WEBHOOK_URL` to your actual webhook

### Option B: Direct Webhook

- Set `NEXT_PUBLIC_N8N_WEBHOOK` to your public N8N webhook URL
- Ensure CORS is enabled on your N8N instance

## 📦 What's Included

```
✅ Modern gradient UI with glassmorphism design
✅ Form component with validation and loading states
✅ Real-time output display with syntax highlighting
✅ JSON response formatting and copy-to-clipboard
✅ Error handling and loading animations
✅ Responsive design for all devices
✅ API proxy for secure webhook handling
✅ TypeScript for type safety
✅ Tailwind CSS for styling
```

## 🔧 Key Files

| File                           | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| `app/page.tsx`                 | Main page with layout and state management |
| `components/FormComponent.tsx` | Form input fields and submission           |
| `components/OutputDisplay.tsx` | JSON output display with code block        |
| `app/api/webhook/route.ts`     | API endpoint to forward requests to N8N    |
| `.env.local`                   | Environment configuration                  |

## 🎨 Customization

### Add New Form Fields

Edit `components/FormComponent.tsx`:

```typescript
// Add to state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
  documentType: 'pdf',
  // ADD HERE:
  yourNewField: '',
});

// Add input to form JSX
<div>
  <label htmlFor="yourNewField">Field Label</label>
  <input
    type="text"
    id="yourNewField"
    name="yourNewField"
    value={formData.yourNewField}
    onChange={handleChange}
    placeholder="Placeholder text"
    // ... other props
  />
</div>
```

### Change Colors

Colors are in Tailwind classes:

- **Primary**: `from-blue-500 to-purple-600`
- **Background**: `from-slate-900 via-slate-800 to-slate-900`
- **Accent**: `from-emerald-600 to-cyan-600`

Modify any `from-*` or `to-*` classes to change colors.

## 🧪 Testing with cURL

Test your webhook endpoint:

```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "documentType": "pdf"
  }'
```

## 📦 Building for Production

```bash
npm run build
npm start
```

The production build is ready for deployment to Vercel, Railway, or any Node.js hosting.

## 🐳 Docker Deployment

```bash
docker build -t n8n-form-app .
docker run -p 3000:3000 -e N8N_WEBHOOK_URL=your-url n8n-form-app
```

## 💡 Tips & Tricks

1. **Local Development**: Use http://localhost:5678 for N8N
2. **Debugging**: Check browser DevTools Network tab for webhook calls
3. **Response Format**: Ensure N8N returns valid JSON in the response
4. **Styling**: All CSS is Tailwind, no external stylesheets needed
5. **Authentication**: Add headers to the fetch call in `app/page.tsx` if needed

## 🆘 Troubleshooting

### "Webhook not connecting"

- Verify N8N instance is running
- Check URL in `.env.local` is correct
- Look at browser console for error details

### "CORS error"

- Use the API proxy (default behavior)
- Or enable CORS on your N8N instance

### "Form won't submit"

- Ensure N8N webhook URL is accessible
- Check N8N webhook is set to accept POST requests
- Verify response body is valid JSON

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **N8N Documentation**: https://docs.n8n.io
- **TypeScript**: https://www.typescriptlang.org/docs

---

**Happy coding! 🎉**
