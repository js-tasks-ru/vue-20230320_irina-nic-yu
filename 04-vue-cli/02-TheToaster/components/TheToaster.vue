<template>
  <div class="toasts">
    <template v-if="currentToasts.length">
      <UiToast
        v-for="(toast, index) in currentToasts"
        :key="index"
        :message="toast.message"
        :icon="toast.icon"
        :type="toast.type"
      />
    </template>
  </div>
</template>

<script>
import { v4 as uuid} from 'uuid';

import UiToast from "./UiToast.vue";

const availableToasts = {
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
};

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
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
        ...availableToasts[type],
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
