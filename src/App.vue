<script setup>
import store from "@/store";
import { toast } from "vue3-toastify";

import CustomToast from "@/components/Toast/Toast.vue";

</script>

<template>

  <div>
    <ToastContainer ref="toastContainer" />
  </div>
  <router-view />
</template>

<style scoped lang="css">
  @import "./App.css";
</style>

