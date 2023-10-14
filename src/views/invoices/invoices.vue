
<style scoped src="./invoices.css"></style>
<script lang="ts" src="./invoices.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1;" v-motion-slide-left>
                <div class="d-flex flex-column" style="gap:12px; background: #fff; width:100%; padding:16px; height:100%; position: relative; border-radius:16px">
                    <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%; gap:16px">
                        <div class="col-6 d-flex flex-row" style="gap:16px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                            <input class="search-input input" placeholder="Enter your input"/>
                        </div>
                        <div class="d-flex flex-row justify-content-start" style="gap:16px; width:220px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Filter:</div>
                            <input class="search-input input" type="date" placeholder="Enter your input" style="width:150px"/>
                        </div>
                    </div>
                    <div class="d-flex flex-column" style="gap:12px" v-motion-slide-left>
                        <div class="d-flex flex-row">
                            <div class="col text-title-1">
                                Invoice ID
                            </div>
                            <div class="col text-title-1">
                                Customer
                            </div>
                            <div class="col text-title-1">
                                Cashier
                            </div>
                            <div class="col text-title-1">
                                Cost
                            </div>
                            <div class="col text-title-1">
                                Date
                            </div>
                        </div>
                        <div class="column-item" v-for="(item, index) in 10" :key="index" data-bs-toggle="modal" data-bs-target="#detailCustomer" @click="handleDetailCustomer(item)">
                            <p class="col">
                                {{ item?.name }}1
                            </p>
                            <p class="col">
                                {{ item?.phoneNumber }}1
                            </p>
                            <p class="col">
                                {{ item?.user?.rank }}1
                            </p>
                            <p class="col">
                                {{ item?.user?.point }}1
                            </p>
                            <p class="col">
                                {{ item?.user?.updatedAt?.slice(0,10) }}1
                            </p>
                        </div>
                    </div>
                    <div class="count-page">
                        <div class="page-number" v-for="(item,index) in 6" :key="index">
                            <p>{{ index+1 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>