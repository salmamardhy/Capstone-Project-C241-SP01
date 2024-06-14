import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    port: 5174,
  },
  root: '.', // Set the root to the project directory
  build: {
    rollupOptions: {
      input: {
        main: 'home.html', // Default entry point
        demo: 'index.html',
        documentation: 'documentation.html',
        about: 'about.html'
      }
    }
  },
  server: {
    port: 5174,
    open: '/home.html' // Automatically open home.html on server start
  }
});
