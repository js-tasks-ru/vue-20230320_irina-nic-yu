<template>
  <div class="toasts">
    <ToastsList v-if="currentToasts.length" :toasts="currentToasts"/>
  </div>
</template>

<script>
import { v4 as uuid} from 'uuid';
import ToastsList from "./ToastsList.vue";

export default {
  name: 'TheToaster',

  components: { ToastsList },

  data() {
    return {
      availableToasts: {
        success: {
          type: 'success',
          timeout: 5000,
          class: 'toast_success',
          icon: 'check-circle',
        },
        error: {
          type: 'error',
          timeout: 5000,
          class: 'toast_error',
          icon: 'alert-circle',
        },
      },
      currentToasts: [],
    };
  },

  methods: {
    success(message) {
      this.addToast('success', message);
    },

    error(message) {
      this.addToast('error', message)
    },

    addToast(type, message) {
      const newToast = {
        ...this.availableToasts[type],
        id: uuid(),
        message,
      };

      this.currentToasts.push(newToast);

      setTimeout(() => this.currentToasts = this.currentToasts.filter(toast => toast.id !== newToast.id), newToast.timeout);
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
