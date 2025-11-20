import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VDS Web Components',
  description: 'Framework-agnostic web components library',
  base: '/',
  
  // Enable hot module replacement
  vite: {
    server: {
      fs: {
        allow: ['..']
      },
      hmr: {
        overlay: true
      }
    },
    resolve: {
      alias: {
        '@': new URL('../../packages', import.meta.url).pathname
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    optimizeDeps: {
      include: ['lit', 'lit/decorators.js', 'lit/directives/class-map.js']
    },
    esbuild: {
      target: 'es2022',
      format: 'esm'
    },
    ssr: {
      noExternal: []
    }
  },
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Tokens', link: '/tokens/' },
      { text: 'Theming', link: '/theming/' },
      { text: 'Accessibility', link: '/accessibility/' }
    ],
    
    sidebar: {
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Modal', link: '/components/modal' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/vds-web-components' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 VDS Web Components'
    }
  }
});

