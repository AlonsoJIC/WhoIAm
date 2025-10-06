# 🚀 Alonso Jiménez - Frontend Developer Portfolio

A modern, responsive portfolio website showcasing web development skills and projects. Built with Angular and featuring smooth animations, SEO optimization, and comprehensive error handling.

![Portfolio Preview](assets/fotoPerfil.webp)

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with dark theme
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🎭 Smooth Animations**: GSAP-powered scroll animations and transitions
- **🔍 SEO Optimized**: Dynamic meta tags, structured data, and social media optimization
- **⚡ Performance Focused**: Progressive loading, image optimization, and lazy loading
- **🛡️ Error Resilient**: Comprehensive error handling with graceful fallbacks
- **♿ Accessible**: WCAG compliant with proper semantic structure

## 🛠️ Technology Stack

### Core Technologies
- **Angular 20.2.1** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced CSS with variables and mixins
- **Bootstrap 5.3.2** - Responsive CSS framework

### Animation & UX
- **GSAP 3.12.5** - Professional-grade animations
- **Animate.css 4.1.1** - CSS animation library
- **Progressive Loading** - Enhanced user experience

### Development Tools
- **Angular CLI** - Development and build tooling
- **Font Awesome** - Icon library
- **ESLint & Prettier** - Code quality and formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/AlonsoJIC/WhoIAm.git

# Navigate to project directory
cd WhoIAm

# Install dependencies
npm install

# Start development server
npm start
```

The application will open automatically at `http://localhost:4200/`

### Build for Production

```bash
# Create optimized production build
npm run build

# The build artifacts will be stored in the dist/ directory
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── about-me/       # Personal introduction section
│   │   ├── about-projects/ # Projects overview section
│   │   ├── button/         # Custom button component
│   │   ├── contact-me/     # Contact section
│   │   ├── navbar/         # Navigation component
│   │   ├── projects/       # Projects grid display
│   │   └── technologies/   # Skills showcase
│   ├── pages/              # Route components
│   │   ├── home/           # Main landing page
│   │   ├── projects/       # Projects listing
│   │   ├── contact/        # Contact page
│   │   ├── project-detail/ # Individual project view
│   │   └── not-found/      # 404 error page
│   ├── services/           # Business logic
│   │   ├── project.service.ts      # Project data management
│   │   ├── seo.service.ts          # SEO optimization
│   │   └── error-handler.service.ts # Error handling
│   ├── models/             # TypeScript interfaces
│   └── assets/             # Static files (images, icons)
```

## 🎯 Key Features

### 🏠 Home Page
- **Scroll-based Navigation**: Smooth scrolling between sections
- **About Me**: Personal introduction and background
- **Technologies**: Interactive skills showcase
- **Projects Preview**: Highlighted work samples
- **Contact**: Professional contact information

### 💼 Projects Section
- **Project Grid**: Responsive card-based layout
- **Detailed Views**: Individual project pages with galleries
- **Technology Filtering**: Filter projects by tech stack
- **Interactive Elements**: Hover effects and smooth transitions

### 🔍 SEO & Performance
- **Dynamic Meta Tags**: Unique titles and descriptions per page
- **Structured Data**: Schema.org markup for search engines
- **Open Graph**: Social media optimization
- **Progressive Loading**: Fast initial load with background asset loading
- **Error Recovery**: Graceful handling of failed resources

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layout for medium screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Touch Navigation**: Swipe gestures on mobile devices

## 🎨 Design System

### Color Palette
- **Primary**: Dark theme with cyan/blue accents
- **Secondary**: Gradient effects and neon highlights
- **Text**: High contrast for accessibility
- **Interactive**: Smooth hover and focus states

### Typography
- **Headers**: Montserrat (bold, impactful)
- **Body**: Poppins (readable, modern)
- **Accent**: Anton (decorative elements)

### Animations
- **Scroll Animations**: GSAP-powered smooth transitions
- **Hover Effects**: Subtle interactive feedback
- **Loading States**: Progressive content reveal
- **Navigation**: Smooth page transitions

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm start

# Production build
npm run build

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Build with file watching
npm run watch

# Lint code
npm run lint

# Format code
npm run format
```

### Development Guidelines

1. **Component Structure**: Follow Angular style guide
2. **Type Safety**: Use TypeScript strictly
3. **Error Handling**: Implement proper error boundaries
4. **Performance**: Optimize for Core Web Vitals
5. **Accessibility**: Maintain WCAG compliance
6. **Testing**: Write unit tests for components and services

## 📖 Documentation

- **[Complete Documentation](DOCUMENTATION.md)** - Comprehensive project guide
- **[API Documentation](API_DOCUMENTATION.md)** - Service interfaces and methods
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions

## 🔍 SEO Features

### Meta Tags
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs for each page

### Structured Data
- Person schema for developer profile
- Organization markup
- Website navigation structure

### Performance
- Image optimization (WebP format)
- Lazy loading implementation
- Progressive enhancement
- Core Web Vitals optimization

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deployment

### Netlify (Recommended)
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the dist/ folder to Netlify
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### GitHub Pages
```bash
# Install Angular GitHub Pages tool
npm install -g angular-cli-ghpages

# Build and deploy
npm run build
npx angular-cli-ghpages --dir=dist/portafolio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Alonso Jiménez**
- **GitHub**: [@AlonsoJIC](https://github.com/AlonsoJIC)
- **LinkedIn**: [alonsojic](https://www.linkedin.com/in/alonsojic/)
- **Portfolio**: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **GSAP** - For powerful animation capabilities
- **Bootstrap** - For responsive design components
- **Font Awesome** - For the icon library
- **Open Source Community** - For inspiration and tools

---

⭐ **If you found this project helpful, please consider giving it a star!**

Built with ❤️ by [Alonso Jiménez](https://github.com/AlonsoJIC)