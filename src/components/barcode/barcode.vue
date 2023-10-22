<script setup lang="ts">
import VueBarcode from '@chenfengyuan/vue-barcode';
const barcodeValue = "567891234";
</script>

<template>
    <vue-barcode class="barcode"
        :value="barcodeValue"
        :options="{ displayValue: false }">
    </vue-barcode>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.barcode {
  width: 180px;
  height: 40px;
}
</style>