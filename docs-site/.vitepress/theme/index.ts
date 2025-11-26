import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import ComponentDemo from '../components/ComponentDemo.vue';
import ComponentGallery from '../components/ComponentGallery.vue';
import ComponentCard from '../components/ComponentCard.vue';
import IconGallery from '../components/IconGallery.vue';
import './custom.css';

// Load web components
import '../components/load-components';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentDemo', ComponentDemo);
    app.component('ComponentGallery', ComponentGallery);
    app.component('ComponentCard', ComponentCard);
    app.component('IconGallery', IconGallery);
  }
};

