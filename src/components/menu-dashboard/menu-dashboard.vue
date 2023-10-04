
<style scoped src="./menu-dashboard.css"></style>
<script lang="ts" src="./menu-dashboard.ts"></script>

<template>
    <div class="d-flex flex-column justify-content-between" style="padding:24px; background-color: #f2f6fc; border-right: solid 1px #E5E6E6;height: calc( 100vh - 66px)">
        <div class="d-flex flex-column align-items-start" style="gap:8px; margin-top: 8px;">
            <p class="big-title">Admin tools</p>
            <div :class="[ pageName==='/dashboard' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/dashboard')">
                <i class="bi bi-grid-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Dashboard</p>
            </div>
            <div :class="[ pageName==='/statistics' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/statistics')">
                <i class="bi bi-bar-chart-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Statistics</p>
            </div>
            <div :class="[ pageName==='/user-management' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/user-management')">
                <i class="bi bi-people-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Users Management</p>
            </div>
            <div :class="[ pageName==='/events' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/events')">
                <i class="bi bi-ticket-perforated-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Events & Vouchers</p>
            </div>
            <hr style="width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
            <p class="big-title">Finance Management</p>
            <div :class="[ pageName==='/expenses' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/expenses')">
                <i class="bi bi-currency-exchange menu-item-icon"></i>
                <p class="text-start menu-item-title">Expenses</p>
            </div>
            <div :class="[ pageName==='/invoices' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/invoices')">
                <i class="bi bi-bar-chart-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Invoices</p>
            </div>
            <div :class="[ pageName==='/reports' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/reports')">
                <i class="bi bi-clipboard2-data-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Reports</p>
            </div>
        </div>
        <div class="logout d-flex flex-column" style="gap:16px">
            <div class="menu-item" @click="handleChangeTab('/')">
                <i class="bi bi-box-arrow-left menu-item-icon"></i>
                <p class="text-start menu-item-title">Log out</p>
            </div>
        </div>
    </div>
</template>