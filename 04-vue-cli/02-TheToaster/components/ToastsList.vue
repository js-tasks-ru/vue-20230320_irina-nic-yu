<template>
  <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="toast.class">
    <UiToast :toast="toast"/>
  </div>
</template>


<script>
import UiToast from "./UiToast.vue";

export default {
  name: 'ToastsList',

  components: { UiToast },

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>

