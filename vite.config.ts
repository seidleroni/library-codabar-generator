import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/library-codabar-generator/',
      define: {
        'process.env.APP_BUILD_NUMBER': JSON.stringify(env.APP_BUILD_NUMBER || 'dev'),
        'process.env.APP_COMMIT_SHA': JSON.stringify(env.APP_COMMIT_SHA || 'local'),
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('.', import.meta.url)),
        }
      }
    };
});