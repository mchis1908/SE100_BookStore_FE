<style scoped src="./voucher-item.css"></style>

<script lang="ts" src="./voucher-item.ts"></script>

<template>
    <div>
        <div class="card">
            
            <div class="main">
                <div class="co-img">
                    <img v-if="voucher.level === 1" src="@/assets/voucher/png/rank-1.png"/>
                    <img v-if="voucher.level === 2" src="@/assets/voucher/png/rank-2.png"/>
                    <img v-if="voucher.level === 3" src="@/assets/voucher/png/rank-3.png"/>
                    <img v-if="voucher.level === 4" src="@/assets/voucher/png/rank-4.png"/>
                </div>
                <div class="vertical"></div>
                <div class="content">
                    <h2>{{ voucher.name }}</h2>
                    <h1>{{ voucher.discountValue * 100 }}% <span>Coupon</span></h1>
                    <p>Valid till {{ formatDate(voucher.expirationDate) }}</p>
                </div>
            </div>
            <div class="copy-button">
                <input id="copyvalue" type="text" readonly :value="voucher.code" />
                <button @click="copyIt" class="copybtn">{{ btnCopyText }}</button>
            </div>
        </div>
    </div>
</template>
