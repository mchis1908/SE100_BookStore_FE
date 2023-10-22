
<style scoped src="./customer-vouchers.css"></style>
<script lang="ts" src="./customer-vouchers.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
      <Header />
      <div class="d-flex flex-row" style="height: calc(100vh - 66px)">
        <MenuDashBoard class="col-2" />
        
        <div
          class="col-10 d-flex flex-column"
          style="
            padding: 24px;
            gap: 24px;
            overflow-y: scroll;
            overflow-x: hidden;
            z-index: 1;
          "
          v-motion-slide-left
        >
          <div
            class="tab-content"
            id="pills-tabContent"
            style="background: #fff; border-radius: 16px; min-height: 100%; overflow-y: auto;"
          >
            <div
                  class="d-flex flex-wrap justify-content-center w-100 mt-5"
                  style="gap: 3%"
                >
                  <h7 v-if="vouchers.length === 0"
                  >There are no vouchers available</h7>
                  <VoucherItem
                    v-else
                    v-for="(item, index) in vouchers"
                    :key="index"
                    :voucher="vouchers[0]"
                  />
                </div>
            </div>
        </div>
      </div>
    </div>

  </template>
  