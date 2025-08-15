# FireBlog - A Modern Blog Template for Firebase Hosting

FireBlog is a responsive, SEO-optimized, and modern blog template built with Next.js, Tailwind CSS, and ShadCN UI components. It's designed to be easily deployed to Firebase Hosting and includes features like an AI-powered tag suggester.

## Features

- **Clean Homepage**: A beautiful homepage showcasing a featured article and a grid of the latest posts.
- **Article Layout**: A well-designed article page for an excellent reading experience.
- **AdSense Ready**: Three clearly marked placeholder sections for Google AdSense ads.
- **Responsive Design**: Fully mobile-friendly layout that works on all devices.
- **AI Tag Suggester**: An integrated tool to generate SEO-friendly tags for your articles using AI.
- **Modern Tech Stack**: Built with Next.js App Router, TypeScript, and Tailwind CSS.
- **Easy to Customize**: The codebase is clean, well-organized, and ready for your content.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Navigate to the project directory after it has been set up.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) to view it in your browser.

## Deploy to Firebase Hosting

Follow these steps to deploy your FireBlog site to Firebase Hosting.

### Prerequisites

- A [Firebase](https://firebase.google.com/) account.
- The [Firebase CLI](https://firebase.google.com/docs/cli) installed on your machine.
  ```bash
  npm install -g firebase-tools
  ```

### Deployment Steps

1.  **Login to Firebase**:
    Authenticate with your Google account.
    ```bash
    firebase login
    ```

2.  **Initialize App Hosting**:
    Run this command in your project's root directory. It will guide you through setting up a new Firebase App Hosting backend. Select your Firebase project when prompted.
    ```bash
    firebase init apphosting
    ```
    This will create the `apphosting.yaml` file if it doesn't exist and link your local project to a Firebase backend.

3.  **Build Your Next.js App**:
    Create a production build of your application.
    ```bash
    npm run build
    ```

4.  **Deploy the Backend**:
    This command will deploy your built Next.js application to Firebase App Hosting.
    ```bash
    firebase apphosting:backends:deploy
    ```
    The CLI will output the URL of your deployed site once the process is complete.

That's it! Your FireBlog is now live on Firebase Hosting.

## Customizing Your Blog

- **Blog Posts**: To change the blog posts, edit the `posts` array in `src/lib/data.ts`.
- **Styling**: Colors and fonts can be changed in `src/app/globals.css` and `tailwind.config.ts`.
- **Navigation**: Update the navigation links in the `Header` component at `src/components/header.tsx`.
