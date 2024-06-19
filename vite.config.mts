import { defineConfig } from 'vitest/config';
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'server.ts'),
            },
        },
    },
    optimizeDeps: {
        include: ['resolve', 'path', 'fs', 'http', 'https', 'url', 'crypto', 'events', 'stream', 'buffer', 'zlib', 'util', 'assert', 'tty', 'os', 'net', 'dns', 'tls', 'dgram', 'child_process', 'cluster', 'readline', 'repl', 'module', 'timers', 'console', 'constants', 'punycode', 'querystring', 'string_decoder', 'perf_hooks', 'async_hooks', 'trace_events', 'inspector', 'vm', 'v8', 'worker_threads', 'perf_hooks', 'os', 'fs', 'path', 'url', 'http', 'https', 'crypto', 'stream', 'events', 'assert', 'util', 'zlib', 'buffer', 'tty', 'net', 'dns', 'tls', 'dgram', 'child_process', 'cluster', 'readline', 'repl', 'module', 'timers', 'console', 'constants', 'punycode', 'querystring', 'string_decoder', 'perf_hooks', 'async_hooks', 'trace_events', 'inspector', 'vm', 'v8', 'worker_threads', 'perf_hooks', 'os', 'fs', 'path', 'url', 'http', 'https', 'crypto', 'stream', 'events', 'assert', 'util', 'zlib', 'buffer', 'tty', 'net', 'dns', 'tls', 'dgram', 'child_process', 'cluster', 'readline', 'repl', 'module', 'timers', 'console', 'constants', 'punycode', 'querystring', 'string_decoder', 'perf_hooks', 'async_hooks', 'trace_events', 'inspector', 'vm', 'v8', 'worker_threads', 'perf_hooks', 'os', 'fs', 'path', 'url', 'http', 'https', 'crypto', 'stream', 'events', 'assert', 'util', 'zlib', 'buffer', 'tty', 'net', 'dns', 'tls', 'dgram', 'child_process', 'cluster', 'readline', 'repl', 'module', 'timers', 'console', 'constants', 'punycode', 'querystring', 'string_decoder', 'perf_hooks', 'async_hooks', 'trace_events', 'inspector']
    },
    plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.{test,spec}.(js|ts)'],
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}/**'
        ],
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma']
        ],
    }
});