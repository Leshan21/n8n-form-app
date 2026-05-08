# Component Customization Guide

## FormComponent Customization

The form component is flexible and can be extended with additional field types.

### Base Structure

```typescript
interface FormComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  isLoading: boolean;
}
```

### Adding Custom Fields

#### 1. Number Input

```typescript
<div>
  <label htmlFor="quantity">Quantity</label>
  <input
    type="number"
    id="quantity"
    name="quantity"
    value={formData.quantity}
    onChange={handleChange}
    min="1"
    max="100"
    placeholder="Enter quantity"
    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
  />
</div>
```

#### 2. Checkbox Group

```typescript
const [formData, setFormData] = useState({
  // ... other fields
  subscribe: false,
  newsletter: false,
});

// In JSX:
<div className="space-y-3">
  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="subscribe"
      checked={formData.subscribe}
      onChange={(e) => setFormData({...formData, subscribe: e.target.checked})}
      className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
    />
    <span className="text-gray-200">Subscribe to updates</span>
  </label>

  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="newsletter"
      checked={formData.newsletter}
      onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
      className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
    />
    <span className="text-gray-200">Receive newsletter</span>
  </label>
</div>
```

#### 3. Radio Button Group

```typescript
const [formData, setFormData] = useState({
  // ... other fields
  priority: 'medium',
});

// In JSX:
<div className="space-y-3">
  <label className="text-sm font-medium text-gray-200 mb-2">Priority Level</label>
  <div className="space-y-2">
    {['low', 'medium', 'high'].map(level => (
      <label key={level} className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="priority"
          value={level}
          checked={formData.priority === level}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span className="text-gray-200 capitalize">{level} Priority</span>
      </label>
    ))}
  </div>
</div>
```

#### 4. File Upload

```typescript
const [formData, setFormData] = useState({
  // ... other fields
  file: null,
});

// Handler
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.[0]) {
    setFormData({...formData, file: e.target.files[0]});
  }
};

// In JSX:
<div>
  <label htmlFor="file" className="block text-sm font-medium text-gray-200 mb-2">
    Upload File
  </label>
  <input
    type="file"
    id="file"
    onChange={handleFileChange}
    accept=".pdf,.doc,.docx,.txt"
    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formData.file && (
    <p className="text-sm text-green-400 mt-2">
      ✓ {formData.file.name}
    </p>
  )}
</div>
```

#### 5. Date Input

```typescript
<div>
  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-200 mb-2">
    Due Date
  </label>
  <input
    type="date"
    id="dueDate"
    name="dueDate"
    value={formData.dueDate}
    onChange={handleChange}
    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
```

#### 6. Textarea with Character Count

```typescript
const maxLength = 500;
const currentLength = formData.message.length;

<div>
  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2 flex justify-between">
    <span>Message</span>
    <span className="text-xs text-gray-400">{currentLength}/{maxLength}</span>
  </label>
  <textarea
    id="message"
    name="message"
    value={formData.message}
    onChange={handleChange}
    maxLength={maxLength}
    placeholder="Your message here..."
    rows={4}
    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />
  <div className={`text-xs mt-2 ${currentLength > maxLength * 0.9 ? 'text-yellow-400' : 'text-gray-400'}`}>
    {maxLength - currentLength} characters remaining
  </div>
</div>
```

## OutputDisplay Customization

### Custom Syntax Highlighting

Add support for multiple language types:

```typescript
// Detect syntax based on content
const detectLanguage = (content: string) => {
  if (content.startsWith("{") || content.startsWith("[")) return "json";
  if (content.includes("<?php")) return "php";
  if (content.includes("<html")) return "html";
  return "text";
};

// Add color coding by language
const languageColors = {
  json: "text-green-400",
  error: "text-red-400",
  xml: "text-yellow-400",
};
```

### Response Stats

Enhance the stats display:

```typescript
const getStatsFromOutput = (output: string) => {
  try {
    const parsed = JSON.parse(output);
    return {
      size: new Blob([output]).size,
      lines: output.split('\n').length,
      depth: getJsonDepth(parsed),
      keys: Object.keys(parsed).length,
    };
  } catch (e) {
    return null;
  }
};

// Add to stats section:
<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
    <p className="text-gray-500 text-xs">Size</p>
    <p className="text-white font-semibold">{stats?.size} B</p>
  </div>
  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
    <p className="text-gray-500 text-xs">Lines</p>
    <p className="text-white font-semibold">{stats?.lines}</p>
  </div>
  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
    <p className="text-gray-500 text-xs">Depth</p>
    <p className="text-white font-semibold">{stats?.depth}</p>
  </div>
  <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
    <p className="text-gray-500 text-xs">Keys</p>
    <p className="text-white font-semibold">{stats?.keys}</p>
  </div>
</div>
```

## Form Validation

Add client-side validation:

```typescript
interface Errors {
  [key: string]: string;
}

const [errors, setErrors] = useState<Errors>({});

const validateForm = (): boolean => {
  const newErrors: Errors = {};

  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }

  if (!formData.email.includes('@')) {
    newErrors.email = 'Valid email is required';
  }

  if (formData.message.length < 10) {
    newErrors.message = 'Message must be at least 10 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    onSubmit(formData);
  }
};

// Show errors:
{errors.name && (
  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
)}
```

## Advanced: Multi-Step Form

Create a wizard-style form:

```typescript
const [step, setStep] = useState(1);
const totalSteps = 3;

<div className="mb-6">
  <div className="flex items-center justify-between">
    {[1, 2, 3].map(s => (
      <div
        key={s}
        className={`flex-1 h-1 mx-2 rounded ${s <= step ? 'bg-blue-500' : 'bg-gray-600'}`}
      />
    ))}
  </div>
  <p className="text-center text-sm text-gray-400 mt-2">Step {step} of {totalSteps}</p>
</div>

{step === 1 && (
  // Step 1 fields
)}
{step === 2 && (
  // Step 2 fields
)}
{step === 3 && (
  // Step 3 fields
)}

<div className="flex gap-4">
  <button
    onClick={() => setStep(step - 1)}
    disabled={step === 1}
    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 rounded"
  >
    Previous
  </button>
  <button
    onClick={() => setStep(step + 1)}
    disabled={step === totalSteps}
    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded"
  >
    Next
  </button>
  {step === totalSteps && (
    <button
      onClick={handleSubmit}
      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
    >
      Submit
    </button>
  )}
</div>
```

## Styling Variations

### Dark/Light Mode Toggle

```typescript
const [isDark, setIsDark] = useState(true);

<div className={`
  ${isDark ? 'bg-slate-900' : 'bg-white'}
  transition-colors duration-300
`}>
  {/* content */}
</div>
```

### Different Button Styles

```typescript
// Outlined button
<button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-4 py-2 rounded">
  Secondary Action
</button>

// Danger button
<button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
  Delete
</button>

// Icon button
<button className="p-2 hover:bg-slate-700 rounded-lg transition">
  <svg className="w-5 h-5" />
</button>
```

---

Use these examples to extend your form component! 🚀
