
<style scoped src="./menu-dashboard.css"></style>
<script lang="ts" src="./menu-dashboard.ts"></script>

<template>
    <div class="d-flex flex-column justify-content-between" style="padding:24px; background-color: #f2f6fc; border-right: solid 1px #E5E6E6; height: calc( 100vh - 66px);">
        <div v-if="userData?.data.role==='admin'" class="d-flex flex-column align-items-start" style="gap:4px; margin-top: 8px;">
            <p class="big-title">Admin tools</p>
            <div :class="[ pageName==='/dashboard' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/dashboard')">
                <i class="bi-grid-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Dashboard</p>
            </div>
            <div :class="[ pageName==='/user-management' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/user-management')">
                <i class="bi-people-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Users Management</p>
            </div>
            <div :class="[ pageName==='/book-management' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/book-management')">
                <i class="bi-book-half menu-item-icon"></i>
                <p class="text-start menu-item-title">Books Management</p>
            </div>
            <div :class="[ pageName==='/events' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/events')">
                <i class="bi-ticket-perforated-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Events & Vouchers</p>
            </div>
            <div :class="[ pageName==='/statistics' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/statistics')">
                <i class="bi-bar-chart-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Statistics</p>
            </div>
            <hr style="width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
            <p class="big-title">Finance Management</p>
            <div :class="[ pageName==='/expenses' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/expenses')">
                <i class="bi-currency-exchange menu-item-icon"></i>
                <p class="text-start menu-item-title">Expenses</p>
            </div>
            <div :class="[ pageName==='/invoices' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/invoices')">
                <i class="bi-receipt menu-item-icon"></i>
                <p class="text-start menu-item-title">Invoices</p>
            </div>
            <div :class="[ pageName==='/salary' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/salary')">
                <i class="bi-cash-coin menu-item-icon"></i>
                <p class="text-start menu-item-title">Employee Salary</p>
            </div>
            <div :class="[ pageName==='/revenue' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/revenue')">
                <i class="bi-bar-chart-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Revenue</p>
            </div>
            <!-- <div :class="[ pageName==='/reports' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/reports')">
                <i class="bi-clipboard2-data-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Reports</p>
            </div> -->
        </div>
        <div v-else-if="userData?.data?.role==='employee'" class="d-flex flex-column align-items-start" style="gap:4px; margin-top: 8px;">
            <p class="big-title">Finance tools</p>
            <div :class="[ pageName==='/selling-books' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/selling-books')">
                <i class="bi bi-stripe menu-item-icon"></i>
                <p class="text-start menu-item-title">Selling Books</p>
            </div>
            
            <div :class="[ pageName==='/refunds' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/refunds')">
                <i class="bi-bootstrap-reboot menu-item-icon"></i>
                <p class="text-start menu-item-title">Refunds</p>
            </div>
            <hr style="width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
            <p class="big-title">Employee tools</p>
            <div :class="[ pageName==='/book-management' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/book-management')">
                <i class="bi-book-half menu-item-icon"></i>
                <p class="text-start menu-item-title">Books Management</p>
            </div>
            <div :class="[ pageName==='/customers' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/customers')">
                <i class="bi-person-badge-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Customers</p>
            </div>
            <div :class="[ pageName==='/report-problems' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/report-problems')">
                <i class="bi-flag-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Report Problem</p>
            </div>
            <div :class="[ pageName==='/pre-order' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/pre-order')">
                <i class="bi-cart-plus-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Pre-order</p>
            </div>
        </div>
        <div v-else-if="userData?.data?.role==='customer'" class="d-flex flex-column align-items-start" style="gap:4px; margin-top: 8px;">
            <p class="big-title">Customer views</p>
            <div :class="[ pageName==='/customer-books' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/customer-books')">
                <i class="bi-grid-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Books</p>
            </div>
            <div :class="[ pageName==='/customer-invoices' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/customer-invoices')">
                <i class="bi-receipt menu-item-icon"></i>
                <p class="text-start menu-item-title">Invoices</p>
            </div>
            <div :class="[ pageName==='/customer-vouchers' ? 'menu-item-active' : '', 'menu-item']" @click="handleChangeTab('/customer-vouchers')">
                <i class="bi-ticket-perforated-fill menu-item-icon"></i>
                <p class="text-start menu-item-title">Vouchers</p>
            </div>
        </div>
        <div class="logout d-flex flex-column" style="gap:16px">
            <div class="menu-item" @click="handleChangeTab('/login')">
                <i class="bi-box-arrow-left menu-item-icon"></i>
                <p class="text-start menu-item-title">Log out</p>
            </div>
        </div>
    </div>
</template>