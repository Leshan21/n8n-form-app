# 🎨 Article Generator - Visual Guide

## Form Layout

```
┌─────────────────────────────────┐
│  AI ARTICLE GENERATOR           │
│  Create unique, high-quality    │
│  articles powered by AI         │
└─────────────────────────────────┘

┌──────────────────────────┬──────────────────────┐
│                          │                      │
│   FORM INPUTS            │   GENERATED ARTICLE  │
│                          │                      │
│ ┌──────────────────────┐ │ ┌──────────────────┐ │
│ │ Article Title        │ │ │ 📄 Article       │ │
│ │ [________________]   │ │ │ Content          │ │
│ │                      │ │ │                  │ │
│ │ Main Topic           │ │ │ Your generated   │ │
│ │ [________________]   │ │ │ article appears  │ │
│ │                      │ │ │ here with nice   │ │
│ │ Writing Style        │ │ │ formatting and   │ │
│ │ [Professional ▼]     │ │ │ readability.     │ │
│ │                      │ │ │                  │ │
│ │ Article Length       │ │ │ [Copy] [Print]   │ │
│ │ [Medium ▼]           │ │ │                  │ │
│ │                      │ │ │ Stats:           │ │
│ │ Keywords             │ │ │ Words: 850       │ │
│ │ [________________]   │ │ │ Size: 6.2 KB     │ │
│ │ [________________]   │ │ │ Status: ✓        │ │
│ │                      │ │ │                  │ │
│ │ [→ Generate Article] │ │ │                  │ │
│ │                      │ │ │                  │ │
│ └──────────────────────┘ │ └──────────────────┘ │
│                          │                      │
└──────────────────────────┴──────────────────────┘
```

## Form Fields Explained

### 1. Article Title

```
┌─────────────────────────────────┐
│ Article Title                   │
│ e.g., The Future of AI in 2026  │
│ [_____________________________] │
└─────────────────────────────────┘
```

- **Purpose**: Sets the main heading
- **Example**: "Machine Learning in Healthcare"
- **Used in**: Article generation prompt

### 2. Main Topic

```
┌─────────────────────────────────┐
│ Main Topic                      │
│ e.g., AI, Technology, Business  │
│ [_____________________________] │
└─────────────────────────────────┘
```

- **Purpose**: Focuses the article scope
- **Example**: "Cloud Computing"
- **Used in**: Detailed prompting

### 3. Writing Style

```
┌─────────────────────────────────┐
│ Writing Style                   │
│ ○ Professional  (selected)      │
│ ○ Blog/Casual                   │
│ ○ Technical                     │
│ ○ Academic                      │
└─────────────────────────────────┘
```

- **Professional**: Formal, business-oriented tone
- **Blog/Casual**: Friendly, conversational tone
- **Technical**: In-depth, technical terminology
- **Academic**: Research-focused, formal

### 4. Article Length

```
┌─────────────────────────────────┐
│ Article Length                  │
│ ○ Short (300-500 words)         │
│ ○ Medium (500-1000 words) ✓     │
│ ○ Long (1000-2000 words)        │
└─────────────────────────────────┘
```

- **Short**: Quick read, key points only
- **Medium**: Balanced, recommended
- **Long**: Comprehensive, detailed

### 5. Keywords

```
┌─────────────────────────────────┐
│ Keywords (comma separated)      │
│ [_____________________________] │
│ [_____________________________] │
│ [_____________________________] │
│                                 │
│ e.g., machine learning,         │
│ automation, future trends       │
└─────────────────────────────────┘
```

- **Purpose**: Guides content focus
- **Format**: Comma-separated values
- **Count**: 3-10 keywords recommended

## Output Display

### Loading State

```
┌──────────────────────────────────┐
│ Generated Article                │
│ Your AI-generated content       │
├──────────────────────────────────┤
│                                  │
│        ◯ (spinning)              │
│                                  │
│    Waiting for response...       │
│    Processing your request       │
│                                  │
└──────────────────────────────────┘
```

### Success State

```
┌──────────────────────────────────┐
│ Generated Article                │
│ Your AI-generated content       │
├──────────────────────────────────┤
│ 📄 Article Content    [Copy][📤] │
├──────────────────────────────────┤
│                                  │
│ Your Article Title               │
│                                  │
│ Introduction paragraph about     │
│ the topic...                     │
│                                  │
│ Main Section                     │
│ Detailed content explaining      │
│ the main points...               │
│                                  │
│ Conclusion                       │
│ Summary and final thoughts...     │
│                                  │
├──────────────────────────────────┤
│ Words: 850  │ Size: 6.2 KB      │
│ Status: ✓ Complete              │
└──────────────────────────────────┘
```

### Error State

```
┌──────────────────────────────────┐
│ Generated Article                │
│ Your AI-generated content       │
├──────────────────────────────────┤
│                                  │
│ ⚠️  Error                        │
│ Webhook error: Connection failed │
│                                  │
│ Check your N8N webhook URL       │
│                                  │
└──────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────┐
│ User at Browser     │
│                     │
│ ┌─────────────────┐ │
│ │ Article Title   │ │
│ │ Main Topic      │ │
│ │ Style           │ │
│ │ Length          │ │
│ │ Keywords        │ │
│ └────────┬────────┘ │
│          │          │
│  [Generate Article] │
└──────────┬──────────┘
           │
           ↓ HTTP POST
    ┌──────────────────┐
    │  Next.js App     │
    │ (/api/webhook)   │
    │                  │
    │ Validates &      │
    │ Forwards request │
    └────────┬─────────┘
             │
             ↓ HTTP POST
      ┌──────────────────────┐
      │  N8N Webhook         │
      │ (/webhook/article...) │
      │                      │
      │ [Webhook Trigger]    │
      │       ↓              │
      │ [AI Node: OpenAI]    │
      │ Generate article     │
      │ using form data      │
      │       ↓              │
      │ [Function Node]      │
      │ Format response      │
      │       ↓              │
      │ [Response Node]      │
      │ Return article JSON  │
      └──────────┬───────────┘
                 │
                 ↓ JSON Response
           ┌────────────────┐
           │  Next.js App   │
           │ Receives JSON  │
           │ with article   │
           └────────┬───────┘
                    │
                    ↓ Display
           ┌────────────────┐
           │ Browser View   │
           │ Beautiful      │
           │ Article Format │
           │                │
           │ [Copy][Print]  │
           │ Stats          │
           └────────────────┘
```

## Color Scheme

### Dark Slate Background

- Page: `#0f172a` (slate-900)
- Section: `#1e293b` (slate-800)
- Cards: `#1e293b/50` with backdrop blur

### Gradient Accents

- **Heading**: Blue → Purple → Pink
- **Form Border**: Blue → Purple
- **Output Border**: Emerald → Cyan
- **Button**: Blue → Purple

### Text Colors

- **Primary**: White (#ffffff)
- **Secondary**: Gray-300 (#d1d5db)
- **Tertiary**: Gray-400 (#9ca3af)
- **Muted**: Gray-600 (#4b5563)

### Status Indicators

- **Success**: Green-400 (#4ade80)
- **Error**: Red-400 (#f87171)
- **Loading**: Blue pulse animation

## Responsive Design

### Mobile (< 640px)

```
┌─────────────────┐
│ FORM INPUTS     │
│                 │
│ [Form fields]   │
│ [Generate]      │
└─────────────────┘
┌─────────────────┐
│ OUTPUT ARTICLE  │
│                 │
│ [Article text]  │
│ [Stats]         │
└─────────────────┘
```

### Tablet (640px - 1024px)

```
┌───────────────┬───────────────┐
│ FORM INPUTS   │ OUTPUT        │
│               │ ARTICLE       │
│ [Form]        │ [Article]     │
│ [Button]      │ [Stats]       │
└───────────────┴───────────────┘
```

### Desktop (> 1024px)

```
┌─────────────────────────────────────────────┐
│ AI ARTICLE GENERATOR                        │
│ Create unique articles                      │
└─────────────────────────────────────────────┘

┌──────────────────┬──────────────────────────┐
│ FORM             │ OUTPUT                   │
│                  │                          │
│ Title [_____]    │ 📄 Article               │
│ Topic [_____]    │ Your generated article   │
│ Style [▼]        │ content appears here     │
│ Length [▼]       │ with proper formatting   │
│ Keywords [___]   │ and typography.          │
│                  │                          │
│ [Generate Art.] │ [Copy] [Print]           │
│                  │ Words: 850, Size: 6.2KB  │
└──────────────────┴──────────────────────────┘
```

## Interaction States

### Button States

```
NORMAL:     Gradient blue-purple with shadow
HOVER:      Darker gradient, slight scale up
ACTIVE:     Pressed appearance
DISABLED:   Gray, opacity 50%, cursor not-allowed
```

### Input States

```
NORMAL:     Light slate border, dark background
FOCUS:      Blue ring, transparent border
ERROR:      Red border (when validation fails)
DISABLED:   Opacity 50%, cursor not-allowed
```

### Card States

```
NORMAL:     50% opacity, backdrop blur, subtle shadow
HOVER:      Slight brightness increase
ACTIVE:     Pressing effect (slight scale down)
```

---

This is your new AI Article Generator! Start creating amazing content! 🚀
