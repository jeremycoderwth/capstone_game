import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rolldownOptions: {
            input: {
                main: 'index.html',
                researcher: 'researcher.html',
            },
        },
    },
});