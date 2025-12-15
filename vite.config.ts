import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import swc from 'unplugin-swc'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
    plugins: [
        vue(),
        swc.vite({
            jsc: {
                parser: {
                    syntax: 'typescript',
                    decorators: true
                },
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true
                },
                target: 'es2020'
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/core', import.meta.url))
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            tsconfigRaw: {
                compilerOptions: {
                    experimentalDecorators: true
                }
            }
        }
    },
    server: {
        host: true,
        port: 5173
    }
})