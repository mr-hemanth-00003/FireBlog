export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
}

export const posts: Post[] = [
  {
    slug: 'getting-started-with-firebase',
    title: 'Getting Started with Firebase: A Beginner\'s Guide',
    excerpt: 'Firebase is a comprehensive app development platform from Google. Learn how to set up your first project and explore its core services.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">Firebase, backed by Google, provides a suite of tools to help developers build, release, and monitor web, Android, and iOS applications. It's a powerhouse for everything from backend services to analytics.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Setting Up Your First Project</h3>
      <p class="mb-4 text-lg leading-relaxed">Getting started is simple. Head over to the Firebase Console, sign in with your Google account, and click "Add project". The setup wizard will guide you through the process, asking for a project name and a few configuration options.</p>
      <img src="https://placehold.co/800x400.png" alt="Firebase Console" data-ai-hint="firebase console" class="rounded-lg my-6 shadow-md" />
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Core Services to Explore</h3>
      <ul class="list-disc list-inside mb-4 space-y-2 text-lg">
        <li><strong>Firestore:</strong> A flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.</li>
        <li><strong>Authentication:</strong> Provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app.</li>
        <li><strong>Hosting:</strong> Fast and secure web hosting for your static and dynamic content, with a global CDN.</li>
        <li><strong>Cloud Functions:</strong> Lets you run backend code in response to events triggered by Firebase features and HTTPS requests.</li>
      </ul>
      <pre class="bg-card p-4 rounded-lg my-6 overflow-x-auto border"><code class="font-code text-sm">import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);</code></pre>
      <p class="text-lg leading-relaxed">This is just the tip of the iceberg. Firebase offers many more services like Cloud Storage, Machine Learning, and Crashlytics to enhance your app.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'firebase logo',
    author: {
      name: 'Jane Doe',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 26, 2023',
  },
  {
    slug: 'modern-css-styling',
    title: 'Modern CSS Styling for Web Developers',
    excerpt: 'Dive into the world of modern CSS. From Flexbox and Grid to custom properties and beyond, we cover the essentials for today\'s web.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">CSS has evolved dramatically over the years. What was once a simple language for styling documents is now a powerful system for creating complex, responsive layouts and user interfaces.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">CSS Grid and Flexbox</h3>
      <p class="mb-4 text-lg leading-relaxed">The two pillars of modern layout are Flexbox and CSS Grid. Flexbox is ideal for one-dimensional layouts (a row or a column), while Grid excels at two-dimensional layouts. Mastering both is key to building any layout you can imagine.</p>
      <img src="https://placehold.co/800x400.png" alt="CSS Grid Diagram" data-ai-hint="css grid" class="rounded-lg my-6 shadow-md" />
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">CSS Custom Properties (Variables)</h3>
      <p class="mb-4 text-lg leading-relaxed">CSS Variables allow you to store values for reuse throughout your stylesheet. This is a game-changer for theming and maintaining large codebases.</p>
      <pre class="bg-card p-4 rounded-lg my-6 overflow-x-auto border"><code class="font-code text-sm">:root {
  --primary-color: #70A1A9;
  --background-color: #F0F2F5;
}

body {
  background-color: var(--background-color);
  color: var(--primary-color);
}</code></pre>
      <p class="text-lg leading-relaxed">By combining these modern features, you can write cleaner, more efficient, and more maintainable CSS for all your projects.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code screen',
    author: {
      name: 'John Smith',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 22, 2023',
  },
  {
    slug: 'seo-optimization-basics',
    title: 'SEO Optimization Basics for Your Website',
    excerpt: 'Learn the fundamentals of Search Engine Optimization (SEO) to increase your site\'s visibility and attract more organic traffic.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">Search Engine Optimization (SEO) is the practice of increasing the quantity and quality of traffic to your website through organic search engine results. It's about understanding what people are searching for online, the answers they are seeking, the words they’re using, and the type of content they wish to consume.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Semantic HTML</h3>
      <p class="mb-4 text-lg leading-relaxed">Using semantic HTML tags like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> helps search engines understand the structure and content of your page. It's a simple but effective way to improve your on-page SEO.</p>
      <img src="https://placehold.co/800x400.png" alt="HTML5 code" data-ai-hint="html code" class="rounded-lg my-6 shadow-md" />
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Keywords and Content</h3>
      <p class="mb-4 text-lg leading-relaxed">High-quality content is king. Research relevant keywords for your industry and create valuable, informative content that answers user queries. This not only helps with ranking but also establishes your site as an authority.</p>
       <p class="text-lg leading-relaxed">By focusing on these core principles, you'll be well on your way to climbing the search engine rankings.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'analytics graph',
    author: {
      name: 'Alex Johnson',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 18, 2023',
  },
  {
    slug: 'react-hooks-guide',
    title: 'The Ultimate Guide to React Hooks',
    excerpt: 'Unlock the full potential of functional components with React Hooks. This guide covers useState, useEffect, and custom hooks.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">React Hooks revolutionized how we write React components. They allow you to use state and other React features without writing a class. This leads to cleaner, more readable, and more composable code.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">The <code>useState</code> Hook</h3>
      <p class="mb-4 text-lg leading-relaxed">The <code>useState</code> hook is the most basic and essential hook. It lets you add state to functional components. When you call <code>useState</code>, you get back a pair: the current state value and a function that lets you update it.</p>
      <img src="https://placehold.co/800x400.png" alt="React code snippet" data-ai-hint="react code" class="rounded-lg my-6 shadow-md" />
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">The <code>useEffect</code> Hook</h3>
      <p class="mb-4 text-lg leading-relaxed">The <code>useEffect</code> hook lets you perform side effects in functional components. It's a close replacement for <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code> in class components.</p>
      <p class="text-lg leading-relaxed">By mastering these fundamental hooks, you'll be able to build powerful and efficient React applications.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'react logo',
    author: {
      name: 'Emily White',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 15, 2023',
  },
  {
    slug: 'scalable-nodejs-api',
    title: 'Building a Scalable API with Node.js and Express',
    excerpt: 'Learn the best practices for building robust and scalable RESTful APIs using Node.js and the Express framework.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">Node.js, with its non-blocking I/O and event-driven architecture, is a perfect choice for building fast and scalable network applications. When combined with Express, a minimal and flexible Node.js web application framework, you have a powerful duo for API development.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Structuring Your Project</h3>
      <p class="mb-4 text-lg leading-relaxed">A well-structured project is crucial for maintainability. A common approach is to separate your concerns: routes, controllers, services, and models. This makes your codebase easier to navigate and debug as it grows.</p>
      <pre class="bg-card p-4 rounded-lg my-6 overflow-x-auto border"><code class="font-code text-sm">/
|-- src/
|   |-- api/
|   |   |-- routes/
|   |   |-- controllers/
|   |   |-- models/
|   |-- config/
|   |-- app.js
|-- package.json</code></pre>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Middleware and Error Handling</h3>
      <p class="mb-4 text-lg leading-relaxed">Express middleware functions are the backbone of any Express app. They can perform tasks like logging, authentication, and body parsing. Proper error handling middleware is also essential for catching and responding to errors gracefully.</p>
      <p class="text-lg leading-relaxed">Follow these principles to build APIs that are not only functional but also ready to handle production-level traffic.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'server infrastructure',
    author: {
      name: 'Michael Brown',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 11, 2023',
  },
  {
    slug: 'demystifying-tailwind-css',
    title: 'Demystifying Tailwind CSS for Beginners',
    excerpt: 'Tailwind CSS is a utility-first CSS framework that can be composed to build any design, directly in your markup. Let\'s break it down.',
    content: `
      <p class="mb-4 text-lg leading-relaxed">Tailwind CSS is different from frameworks like Bootstrap or Foundation. Instead of providing pre-styled components, it provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Utility-First Fundamentals</h3>
      <p class="mb-4 text-lg leading-relaxed">The core concept of Tailwind is its utility-first approach. A class like <code>flex</code>, <code>pt-4</code>, or <code>text-center</code> has a single, specific purpose. By combining these, you can build complex components without writing custom CSS.</p>
      <img src="https://placehold.co/800x400.png" alt="Tailwind CSS utilities" data-ai-hint="tailwind code" class="rounded-lg my-6 shadow-md" />
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Customization and Performance</h3>
      <p class="mb-4 text-lg leading-relaxed">Tailwind is highly customizable via its <code>tailwind.config.js</code> file. You can configure everything from your color palette to spacing scales. When it's time for production, Tailwind automatically removes all unused CSS, resulting in a tiny, optimized final bundle.</p>
      <p class="text-lg leading-relaxed">While it may seem verbose at first, the utility-first workflow can dramatically speed up development and improve maintainability.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'css design',
    author: {
      name: 'Jessica Green',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    date: 'October 07, 2023',
  }
];
