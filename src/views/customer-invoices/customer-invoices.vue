
<style scoped src="./customer-invoices.css"></style>
<script lang="ts" src="./customer-invoices.ts"></script>


<template>
    <div
    class="modal fade"
    id="modal-detail-invoice"
    ref="modal-detail-invoice"
    tabindex="-1"
    aria-labelledby="pricingConfirmModalLabel"
    aria-hidden="true"
    >
        <ModalDetailInvoice/>
    </div>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1;" v-motion-slide-left>
                <div class="d-flex flex-column" style="gap:12px; background: #fff; width:100%; padding:16px; height:100%; position: relative; border-radius:16px">
                    <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%; gap:16px">
                        <div class="col-6 d-flex flex-row" style="gap:16px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                            <input class="search-input input" placeholder="Enter your input" v-model="searchQuery"/>
                        </div>
                        <div class="d-flex flex-row justify-content-start" style="gap:16px; width:220px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Filter:</div>
                            <input class="search-input input" type="date" placeholder="Enter your input" style="width:150px" v-model="date"/>
                        </div>
                    </div>
                    <div class="d-flex flex-column" style="gap:12px">
                        <div class="d-flex flex-row">
                            <div class="col text-title-1">
                                Invoice ID
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
                        <div class="column-item" v-for="(item, index) in invoices" :key="index" @click="handleDetailInvoice(item)" v-motion-slide-left>
                            <p class="col">
                                {{ item?._id }}
                            </p>
                            <p class="col">
                                {{ item?.employee?.name }}
                            </p>
                            <p class="col">
                                {{ item?.total }}
                            </p>
                            <p class="col">
                                {{ item?.createdAt?.slice(0,10) }}
                            </p>
                        </div>
                    </div>
                    <div class="count-page">
                        <div :class="[currentPage===index+1 ? 'current-page-number': '','page-number']" v-for="(item,index) in totalPage" :key="index" @click="handleNextPage(index)">
                            <p>{{ index+1 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>