import { defineConfig } from 'windicss/helpers';

export default defineConfig({
   extract: {
      include: ['example/**/*.{vue,ts}'],
      exclude: ['node_modules', '.git']
   }
});
