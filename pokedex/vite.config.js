import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '..',
    rollupOptions: {
      input: {
        main: 'index.html',
        pokedex: 'pokedex.html',
        // Add more pages as needed
      }
    }
  },
  base: '/PokeHunt/',
});