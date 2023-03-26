import { createApp } from './vendor/vue.esm-browser.js';

const VueCalculator = createApp({
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      operator: 'sum',
    }
  },

  computed: {
    result() {
      return this.calculateResult(this.operator, this.firstNumber, this.secondNumber)
    }
  },

  methods: {
    calculateResult(operation, a, b) {
      switch (operation) {
        case 'sum':
          return a + b;

        case 'subtract':
          return a - b;

        case 'multiply':
          return a * b;

        case 'divide': {
          if (b === 0) {
            alert('You cannot divide on zero');
          } else {
            return a / b;
          }
        }
      }
    }
  }
});

VueCalculator.mount('#app');
