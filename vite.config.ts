import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/library-codabar-generator/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.APP_BUILD_NUMBER': JSON.stringify(env.APP_BUILD_NUMBER || 'dev'),
        'process.env.APP_COMMIT_SHA': JSON.stringify(env.APP_COMMIT_SHA || 'local'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
