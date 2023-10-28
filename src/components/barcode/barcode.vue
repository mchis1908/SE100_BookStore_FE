<script lang="ts">
import { Vue, Options } from "vue-class-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
@Options({
    props: {
      barcodeValue:String
    },
    components:{
      VueBarcode
    }
})
export default class Barcode extends Vue {
  public barcodeValue!: string;
}

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
  width: 220px;
  height: 40px;
}
</style>