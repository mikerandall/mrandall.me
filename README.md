# Michael Randall - Personal Portfolio

A minimal, professional portfolio website built with React, Vite, and GSAP animations, showcasing 17+ years of engineering leadership experience.

## Overview

Modern portfolio website featuring a clean black & white aesthetic with smooth GSAP animations. Built to be mobile-first and optimized for recruiters and hiring managers.

## Features

- ✨ Smooth animations powered by GSAP ScrollTrigger
- 🎨 Minimal black & white design with blue accent
- 📱 Mobile-first responsive design
- ⚡ Lightning-fast performance with Vite
- 🎯 Smooth scroll animations
- 💼 Sections: Hero, About, Experience, Skills, Personal Projects, Contact
- 🔄 Expandable CGI projects section (5 sub-projects)
- 📊 Animated skill progress bars
- 🔗 Direct links to live personal projects

## Content

### Sections

1. **Hero** - Name, title, and professional tagline
2. **About** - Professional summary with key stats (17+ years, 40+ team size, $10M+ funding)
3. **Experience** - Complete work history with expandable CGI entry
   - CGI (2019-Present) - Expandable section with 5 projects
   - Diameter Health (2017-2018)
   - EXOS (2008-2017)
   - WWE (2006-2008)
4. **Skills** - 4 categories with animated progress bars
   - Frontend Development
   - Backend & Database
   - Cloud & DevOps
   - Leadership & Process
5. **Personal Projects** - 2 featured projects
   - HealthQuo.AI - AI-powered health management system
   - Deathwink - Serverless posthumous messaging app
6. **Contact** - Form and social links

### Key Highlights

- **17+ Years** professional experience
- **40+ Developers** largest team led
- **$10M+ Funding** secured for eReviewManager
- **$90B Platform** contract strategy tool
- **Fortune 100 Clients** - Intel, Google, Tesla, Cigna, WWE

## Tech Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Animations**: GSAP 3.12.5 with ScrollTrigger
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect, useRef)

## Design System

### Color Palette

```css
:root {
  --accent-color: #2563eb;        /* Blue accent */
  --bg-white: #ffffff;            /* Primary background */
  --bg-light: #f8f9fa;            /* Secondary background */
  --text-black: #0a0a0a;          /* Primary text */
  --text-gray: #6b7280;           /* Secondary text */
  --text-light-gray: #9ca3af;     /* Tertiary text */
  --border-color: #e5e7eb;        /* Borders */
  --border-dark: #d1d5db;         /* Dark borders */
}
```

### Typography

- **Headings**: System fonts with font-weight 600-700
- **Body**: 1rem base with 1.6-1.7 line-height
- **Mobile-optimized**: clamp() for responsive sizing

### Components

- **Cards**: Clean borders with subtle hover effects
- **Buttons**: Minimal with border transitions
- **Navigation**: Fixed header with hamburger menu on mobile
- **Forms**: Simple inputs with focus states

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd mrandall.me
```

2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
mrandall.me/
├── src/
│   ├── components/
│   │   ├── Hero.jsx/css           # Landing section
│   │   ├── About.jsx/css          # Professional summary & stats
│   │   ├── Experience.jsx/css     # Work history with expandable CGI
│   │   ├── Skills.jsx/css         # Animated skill bars
│   │   ├── Projects.jsx/css       # Personal projects showcase
│   │   ├── Contact.jsx/css        # Contact form & social links
│   │   └── Navigation.jsx/css     # Fixed nav with mobile menu
│   ├── utils/
│   │   └── animations.js          # Reusable GSAP animations
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Global utilities
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles & variables
├── public/
│   ├── vite.svg                   # Favicon
│   └── Michael-Randall-Resume.pdf # Resume PDF
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── Resume.md                      # Resume source content
├── CUSTOMIZATION_GUIDE.md         # Content update guide
├── REDESIGN_SUMMARY.md            # Design documentation
└── README.md                      # This file
```

## Customization

To update with your own information:

### Quick Updates

1. **Contact Links** - Edit `src/components/Contact.jsx` (line 33)
2. **Social URLs** - Update LinkedIn, GitHub, Email links
3. **Resume PDF** - Replace `public/Michael-Randall-Resume.pdf`

### Full Content Updates

See `CUSTOMIZATION_GUIDE.md` for detailed instructions on:
- Adding your work experience
- Updating your skills and proficiency levels
- Adding your personal projects
- Customizing colors and styling

### Color Customization

Edit `src/index.css` to change the color scheme:

```css
:root {
  --accent-color: #2563eb;  /* Change to your brand color */
}
```

## Key Features

### Mobile-First Design

- Hamburger menu navigation (< 768px)
- Stacked layouts for easy scrolling
- Touch-friendly buttons (44px minimum)
- Optimized typography scaling
- Reduced padding for compact sections

### Expandable CGI Projects

The Experience section features an innovative expandable design:
- **Collapsed**: Shows CGI role, period, and 5 key highlights
- **Expanded**: Click to reveal all 5 CGI sub-projects with full details
- **Consistent**: Maintains same visual style as other experience entries

### Animated Skills

Skills section features animated progress bars that:
- Animate on scroll using GSAP
- Show proficiency levels (0-100%)
- Organize skills into 4 categories
- Provide visual hierarchy with colored accent

### Personal Projects

Showcases 2 personal projects with:
- Project descriptions and technology stacks
- Direct links to live websites
- Technology badges for quick scanning
- Year indicators

## Performance

### Build Stats

- **CSS**: 11.79 KB (gzipped: 2.62 KB)
- **JS**: 274.21 KB (gzipped: 96.66 KB)
- **Total**: ~99 KB gzipped

### Optimizations

- Component-based architecture for code splitting
- GSAP ScrollTrigger for efficient scroll animations
- CSS transforms for hardware-accelerated animations
- Minimal dependencies for fast load times
- Optimized production builds with Vite

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Options

**Vercel (Recommended)**:
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**:
1. Update `vite.config.js` with base path
2. Build: `npm run build`
3. Deploy `dist/` folder

## Documentation

- **[CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)** - Detailed content update guide
- **[REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)** - Design system documentation
- **[QUICK_START.md](./QUICK_START.md)** - Getting started guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Initial build overview
- **[UPDATES.md](./UPDATES.md)** - Resume integration details

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint (if configured)
```

### Tech Decisions

**Why React?**
- Component reusability
- Large ecosystem
- Easy to maintain
- Great for single-page applications

**Why Vite?**
- Extremely fast HMR
- Optimized builds
- Simple configuration
- Better developer experience

**Why GSAP?**
- Professional-grade animations
- Excellent performance
- ScrollTrigger plugin
- Cross-browser compatibility

## SEO

The site includes comprehensive meta tags for SEO:

- Title: "Michael Randall - Engineering Leader | Healthcare & Enterprise Solutions"
- Description highlighting 17+ years experience
- Open Graph tags for social sharing
- Twitter Card metadata
- Proper semantic HTML structure

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for icons (via aria-label)
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels for screen readers

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Created by Michael Randall

## Support

For questions or issues:
- Review the documentation in this repository
- Check `CUSTOMIZATION_GUIDE.md` for content updates
- See `REDESIGN_SUMMARY.md` for design details

---

**Last Updated**: November 2025  
**Version**: 2.0 (Minimal Redesign)  
**Status**: Production Ready ✅
