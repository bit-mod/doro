import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path' // 确保引入了 path 模块


// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss(),],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src') // 将@映射到src目录
        },
    }
})
