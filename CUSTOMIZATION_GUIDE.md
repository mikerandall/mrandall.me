# Customization Guide

This guide will help you replace the placeholder content with your actual resume information.

## 📝 Content Updates

### 1. Hero Section (`src/components/Hero.jsx`)

**Lines to update:**
- Line 49-50: Your name
- Line 53: Your title/role

```jsx
<h1 className="hero-title" ref={titleRef}>
  <span className="gradient-text">Your First Name</span>
  <span className="gradient-text">Your Last Name</span>
</h1>
<p className="hero-subtitle" ref={subtitleRef}>
  Your Professional Title
</p>
```

### 2. About Section (`src/components/About.jsx`)

**Update the three cards (starting around line 35):**
- Card 1: "Who I Am" - Your personal introduction
- Card 2: "What I Do" - Your specialization and services
- Card 3: "My Approach" - Your work philosophy

**Update stats (starting around line 59):**
```jsx
<div className="stat-number gradient-text">X+</div>
<div className="stat-label">Years Experience</div>
```
Update with your actual numbers.

### 3. Experience Section (`src/components/Experience.jsx`)

**Replace the experiences array (starting around line 37):**

```jsx
const experiences = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    period: 'Start Year - End Year',
    description: 'What you did in this role...',
    technologies: ['Tech1', 'Tech2', 'Tech3']
  },
  // Add more experiences
]
```

Copy this object structure for each job from your resume.

### 4. Skills Section (`src/components/Skills.jsx`)

**Update skillCategories array (starting around line 28):**

```jsx
const skillCategories = [
  {
    title: 'Frontend', // or your category name
    skills: [
      { name: 'Technology Name', level: 90 }, // level is 0-100
      // Add your skills
    ]
  },
  // Add more categories
]
```

**Tips:**
- Level should reflect your proficiency (0-100)
- Organize into logical categories
- Include all technologies from your resume

### 5. Projects Section (`src/components/Projects.jsx`)

**Update projects array (starting around line 28):**

```jsx
const projects = [
  {
    title: 'Project Name',
    description: 'Brief description of the project...',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    gradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
    link: 'https://your-project-url.com' // or '#' if no link
  },
  // Add more projects
]
```

**Available gradient presets:**
- `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` - Purple
- `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)` - Pink
- `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)` - Blue
- `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)` - Green
- `linear-gradient(135deg, #fa709a 0%, #fee140 100%)` - Orange
- `linear-gradient(135deg, #30cfd0 0%, #330867 100%)` - Teal

### 6. Contact Section (`src/components/Contact.jsx`)

**Update social links (starting around line 51):**

```jsx
const socialLinks = [
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/yourprofile' },
  { name: 'GitHub', icon: '💻', url: 'https://github.com/yourusername' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourhandle' },
  { name: 'Email', icon: '📧', url: 'mailto:your@email.com' }
]
```

**Update intro text (around line 72-76):**
```jsx
<p>
  Your personal message about working together...
</p>
```

**Form submission:**
The form currently shows an alert. To connect a real backend:
1. Replace the `handleSubmit` function (line 40)
2. Add your API endpoint or email service (e.g., EmailJS, Formspree)

### 7. Navigation (`src/components/Navigation.jsx`)

**Update logo (line 53):**
```jsx
<div className="nav-logo gradient-text">YI</div>
```
Use your initials or personal logo.

## 🎨 Color Customization

All colors are in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;    /* Main accent color */
  --secondary-color: #8b5cf6;  /* Secondary accent */
  --accent-color: #ec4899;     /* Highlights */
  --bg-dark: #0f0f23;          /* Background */
  --bg-darker: #080815;        /* Darker background */
  --text-light: #e5e7eb;       /* Main text */
  --text-gray: #9ca3af;        /* Secondary text */
}
```

**Popular color schemes:**

**Blue & Purple (default):**
- primary: #6366f1
- secondary: #8b5cf6
- accent: #ec4899

**Green & Teal:**
- primary: #10b981
- secondary: #14b8a6
- accent: #06b6d4

**Orange & Red:**
- primary: #f59e0b
- secondary: #ef4444
- accent: #ec4899

**Purple & Pink:**
- primary: #a855f7
- secondary: #ec4899
- accent: #f43f5e

## 📄 Meta Tags & SEO

Update `index.html`:
- Line 6: Page description
- Line 7: Keywords
- Lines 11-12: Open Graph title and description
- Lines 15-16: Twitter card info

## 🖼️ Adding Images

### Project Images:
1. Add images to `/public/projects/`
2. In Projects.jsx, add image property:
```jsx
{
  title: 'Project Name',
  image: '/projects/project-name.jpg',
  // ... rest
}
```
3. Update JSX to display image

### Profile Picture:
1. Add image to `/public/`
2. Import in About.jsx or Hero.jsx
3. Add `<img>` tag in the component

## 🚀 Deployment

The site is ready to deploy to:

### Vercel:
```bash
npm install -g vercel
vercel
```

### Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages:
1. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/repository-name/',
  // ...
})
```
2. Run: `npm run build`
3. Deploy the `dist` folder

## 📱 Testing

1. **Development**: `npm run dev`
2. **Production**: `npm run build && npm run preview`
3. **Mobile**: Use browser dev tools or test on real devices

## 🔧 Advanced Customization

### Add New Section:
1. Create component in `/src/components/`
2. Import and add to `App.jsx`
3. Add navigation link in `Navigation.jsx`

### Modify Animations:
Edit `/src/utils/animations.js` or component-specific useEffect hooks.

### Add Contact Form Backend:
Consider using:
- EmailJS
- Formspree
- Netlify Forms
- Your own API

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Ensure all dependencies are installed
3. Clear cache and rebuild
4. Check the README.md for troubleshooting

Happy customizing! 🎉

