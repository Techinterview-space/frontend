// Import SSR polyfills FIRST - must be before any browser-dependent code
import './ssr-polyfills';

export { AppServerModule as default } from './app/app.module.server';
