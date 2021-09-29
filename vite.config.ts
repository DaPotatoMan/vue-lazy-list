import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Types from 'vite-plugin-dts';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
   resolve: {
      alias: {
         '~': resolve(__dirname, 'src')
      }
   },

   server: {
      fs: {
         strict: true
      }
   },

   plugins: [
      Vue(),
      AutoImport({
         dts: './types/auto-imports.d.ts',
         imports: ['vue']
      }),
      WindiCSS(),
      Types()
   ],

   build: {
      lib: {
         name: 'VueLazyList',
         fileName: 'lib',
         entry: resolve(__dirname, 'src/index.ts')
      },

      rollupOptions: {
         external: ['vue', 'lodash-es'],
         output: {
            globals: {
               vue: 'Vue'
            }
         }
      }
   },

   optimizeDeps: {
      include: ['vue'],
      exclude: ['vue-demi']
   }
});
