/**
 * SEO Configuration for Alonso Jiménez Portfolio
 * Update these values when deploying to different environments
 */

export const SEO_CONFIG = {
  // Base URL - Update this when you deploy your site
  baseUrl: 'https://alonsojic.github.io/WhoIAm',

  // Default SEO values
  defaultTitle: 'Alonso Jiménez - Systems Engineer & Full Stack Developer | Portfolio',
  defaultDescription: 'Systems Engineer and Full Stack Developer specialized in Angular, JavaScript, and modern web technologies. Explore my portfolio of innovative software solutions and web applications.',
  defaultKeywords: 'Systems Engineer, Full Stack Developer, Software Engineer, Angular Developer, JavaScript, TypeScript, Web Development, Software Development, Portfolio, Alonso Jiménez',

  // Author information
  author: {
    name: 'Alonso Jiménez',
    email: 'jalonsojic@gmail.com', // Update with your real email
    linkedIn: 'https://www.linkedin.com/in/alonsojic/',
    github: 'https://github.com/AlonsoJIC',
    website: 'https://alonsojic.github.io/WhoIAm'
  },

  // Social media images
  defaultImage: '/assets/fotoPerfil.webp',

  // Social media accounts (for structured data)
  socialProfiles: [
    'https://www.linkedin.com/in/alonsojic/',
    'https://github.com/AlonsoJIC',
    'https://www.instagram.com/jalonsojic/',
    'https://www.facebook.com/alonsojic/'
  ]
};

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: {
    title: 'Alonso Jiménez - Systems Engineer & Full Stack Developer | Portfolio',
    description: 'Systems Engineer and Full Stack Developer specialized in Angular, JavaScript, and modern web technologies. Explore my portfolio showcasing innovative software solutions, web applications, and cutting-edge development projects.',
    keywords: 'Systems Engineer, Full Stack Developer, Software Engineer, Angular Developer, JavaScript, TypeScript, Web Development, Software Development, Portfolio, GSAP Animations, Responsive Design'
  },

  projects: {
    title: 'Projects - Alonso Jiménez | Systems Engineer & Developer Portfolio',
    description: 'Explore my portfolio of software development projects including Angular applications, full-stack solutions, and modern web technologies. See my work with JavaScript, TypeScript, and various frameworks.',
    keywords: 'software development projects, full stack projects, Angular projects, JavaScript, TypeScript, portfolio, responsive design, systems engineering, web development'
  },

  contact: {
    title: 'Contact - Alonso Jiménez | Systems Engineer & Developer',
    description: 'Get in touch with Alonso Jiménez, Systems Engineer and Full Stack Developer. Connect via LinkedIn, GitHub, or email for software development projects and engineering opportunities.',
    keywords: 'contact developer, hire systems engineer, hire full stack developer, software development services, Angular developer contact, engineering services'
  }
};
