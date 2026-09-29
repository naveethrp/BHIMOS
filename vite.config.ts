import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      // EBUSY: Windows native fs.watch throws when a file under a watched dir is
      // held open by another process (image previewers, Explorer thumbnails, an
      // editor). It crashed the dev server outright on
      // public/images/composition/download.jpeg. Polling avoids the native
      // watcher entirely, so no lock can take the server down. The watched set is
      // small because data/ and assets/ are already excluded below.
      usePolling: true,
      interval: 1000,
      ignored: [
        '**/.temp*/**',
        '**/scratch*/**',
        '**/.ai-review/**',
        '**/data/**',
        '**/assets/**',
        '**/convo/**',
        '**/public/images/**',
        '**/dist/**'
      ]
    }
  }
});
