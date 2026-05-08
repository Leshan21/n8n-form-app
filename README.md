# N8N Form App

A modern, responsive web application built with **Next.js**, **Tailwind CSS**, and **TypeScript** that seamlessly integrates with n8n webhooks. Send data through an elegant form interface and receive processed output in a beautiful code display.

## ✨ Features

- **Modern UI Design** - Glassmorphism cards with gradient accents and smooth animations
- **Real-time Processing** - Watch for responses from your N8N workflows
- **Code Output Display** - JSON responses rendered in a code editor-style block
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Error Handling** - Clear error messages and loading states
- **Copy to Clipboard** - One-click copying of JSON output
- **Beautiful Animations** - Subtle pulse effects and smooth transitions
- **Dark Mode** - Modern dark theme optimized for eye comfort

## 🚀 Quick Start

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Update `.env.local` with your N8N webhook URL:

   ```env
   # Your N8N webhook URL
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-workflow-name

   # API proxy endpoint (default)
   NEXT_PUBLIC_N8N_WEBHOOK=/api/webhook
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📋 Form Fields

The default form includes:

- **Full Name** - Text input for user's name
- **Email Address** - Email input field
- **Document Type** - Dropdown selector (PDF, DOCX, JSON, CSV)
- **Message** - Textarea for additional content

You can customize these fields by editing `components/FormComponent.tsx`

## 🔄 How It Works

1. User fills out the form with desired data
2. Click "Send to N8N" button to submit
3. Form data is sent to your N8N webhook via the API proxy
4. N8N processes the workflow
5. Response is displayed in the Output panel as formatted JSON
6. Users can copy the output or submit another request

## 🔧 API Integration

### Using the API Proxy (Recommended)

The app uses an internal API proxy at `/api/webhook` which:

- Forwards requests to your N8N webhook
- Handles CORS issues
- Provides error handling
- Logs requests for debugging

### Direct Webhook URL

If you want to use a direct webhook URL (accessible publicly):

1. Update `NEXT_PUBLIC_N8N_WEBHOOK` in `.env.local`:

   ```env
   NEXT_PUBLIC_N8N_WEBHOOK=https://n8n.example.com/webhook/your-workflow
   ```

2. Ensure your N8N instance allows CORS for your domain

## 📁 Project Structure

```
n8n-form-app/
├── app/
│   ├── page.tsx                 # Main page component
│   ├── layout.tsx              # Root layout
│   └── api/
│       └── webhook/
│           └── route.ts         # Webhook API handler
├── components/
│   ├── FormComponent.tsx        # Form input component
│   └── OutputDisplay.tsx        # JSON output display component
├── public/                      # Static assets
├── .env.local                  # Local environment variables
├── .env.example                # Example environment file
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Customization

### Change Form Fields

Edit `components/FormComponent.tsx`:

```typescript
const [formData, setFormData] = useState({
  // Add your custom fields here
  yourField: "",
});
```

### Modify Colors

Update the Tailwind CSS classes in components:

- Primary gradient: `from-blue-500 to-purple-600`
- Background: `from-slate-900 via-slate-800 to-slate-900`
- Accents: `from-emerald-600 to-cyan-600`

### Adjust Layout

Modify the grid layout in `app/page.tsx`:

```typescript
<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
```

## 🔐 Security Considerations

- Use environment variables for sensitive URLs
- Set `N8N_WEBHOOK_URL` in your server environment only
- Use `NEXT_PUBLIC_*` prefix only for non-sensitive variables
- Implement authentication if your N8N workflow requires it
- Add rate limiting for production use

## 📝 N8N Workflow Setup

### Example Workflow Creation

1. **Create Trigger**: Select "Webhook" trigger in N8N
2. **Add Processing**: Add any nodes you need (HTTP Request, Database, etc.)
3. **Get Webhook URL**: Copy the webhook URL from the trigger
4. **Configure Response**: Use "Respond to Webhook" node to return JSON
5. **Update `.env.local`**: Paste the webhook URL

### Example Response Node

```json
{
  "success": true,
  "message": "Data processed successfully",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "processedAt": "{{ $now }}",
    "input": "{{ $json }}"
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Set environment variables in Vercel dashboard:

- `N8N_WEBHOOK_URL` - Your N8N webhook URL

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t n8n-form-app .
docker run -p 3000:3000 -e N8N_WEBHOOK_URL=your-url n8n-form-app
```

### Other Platforms

- **Netlify**: Requires Next.js with edge functions
- **Railway**: Direct GitHub integration
- **Heroku**: Using buildpacks

## 🛠️ Technology Stack

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Node.js** - JavaScript runtime

## 📚 Dependencies

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.0.0"
}
```

## 🐛 Troubleshooting

### Webhook Not Connecting

1. Check `.env.local` has correct `N8N_WEBHOOK_URL`
2. Verify N8N instance is running
3. Check network tab in browser DevTools
4. Ensure firewall allows outbound connections

### CORS Errors

If using direct webhook URL (not API proxy):

1. Enable CORS in N8N webhook settings
2. Use the API proxy instead (`/api/webhook`)
3. Check your N8N instance logs

### Form Not Submitting

1. Check browser console for errors
2. Verify N8N webhook is active and accepts POST requests
3. Test webhook with cURL:
   ```bash
   curl -X POST http://your-n8n-webhook \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

## 📞 Support

For issues specific to:

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **N8N**: https://docs.n8n.io

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🎯 Future Enhancements

- [ ] File upload support
- [ ] Multi-step form wizard
- [ ] Response history/logging
- [ ] Custom theme selector
- [ ] Advanced code syntax highlighting
- [ ] Webhook request/response logging
- [ ] Form validation schemas
- [ ] Dark/light mode toggle
