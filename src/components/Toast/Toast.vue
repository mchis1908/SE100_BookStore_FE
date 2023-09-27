<template>
  <div>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: String,
  },
  mounted() {
    setTimeout(() => {
      this.$emit("close");
    }, 3000); // Close the toast after 3 seconds (adjust as needed)
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 16px;
  color: #fff;
  font-size: 16px;
  transition: opacity 0.3s ease;
}

.success {
  background-color: #5cb85c;
}

.error {
  background-color: #d9534f;
}
</style>
