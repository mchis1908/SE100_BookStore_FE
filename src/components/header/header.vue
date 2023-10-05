
<style scoped src="./header.css"></style>
<script lang="ts" src="./header.ts"></script>

<template>
    <div class="d-flex flex-row justify-content-between align-items-center" style="padding:8px 28px; background-color:#fff; backdrop-filter: blur(16px); box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
        <div class="d-flex flex-row align-items-center" style="gap:8px;">
            <img src="@/assets/menu-dashboard/png/logo.png" style="height:50px; object-fit:contain"/>
        </div>
        <p style="font-size:24px; font-weight:600; color:#065471">{{ pageTitle }}</p>
        <div class="d-flex flex-row align-items-center" style="gap:8px; height: 100%;">
            <i class="bi bi-person-circle d-flex align-items-center" style="font-size: 30px;"></i>
            <p style="color: #000;
                text-align: right;
                font-size: 14px;
                font-style: normal;
            ">
                {{ userData.data.name }}
            </p>
        </div>
    </div>
</template>