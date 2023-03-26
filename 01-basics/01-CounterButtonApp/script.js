import { createApp } from './vendor/vue.esm-browser.js';

const CounterButtonApp = createApp({
  data() {
    return {
      count: 0,
    }
  },
});

CounterButtonApp.mount('#app');
