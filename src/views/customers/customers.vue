
<style scoped src="./customers.css"></style>
<script lang="ts" src="./customers.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
    <ModalAddCustomer id="addCustomer"/>
    <ModalCustomerDetail id="detailCustomer" :idCustomer="detail?.customerId"/>

        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px; position: relative;">
                    <div class="tab-pane fade show active" id="pills-customer" role="tabpanel" aria-labelledby="pills-customer-tab" style="padding: 16px; gap:12px; min-height: 100%;">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-7 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input" v-model="searchQuery.customer"/>
                            </div>
                            <div class="col-2 btn-add" data-bs-toggle="modal" data-bs-target="#addCustomer">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new customer</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="gap:10px; margin-top: 24px;" v-motion-slide-left>
                            <div class="d-flex flex-row">
                                <div class="col title-1">
                                    Name
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['customer']['name'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('customer', 'name')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Phone Number
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['customer']['phoneNumber'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('customer', 'phoneNumber')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Rank
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['customer']['rank'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('customer', 'rank')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Point
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['customer']['point'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('customer', 'point')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Last Transaction
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['customer']['lastTransaction'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('customer', 'lastTransaction')"></i></span> -->
                                </div>
                            </div>
                            <div class="person-item" v-for="(item, index) in list?.customer" :key="index" data-bs-toggle="modal" data-bs-target="#detailCustomer" @click="handleDetailCustomer(item)" v-motion-slide-left>
                                <p class="col">
                                    {{ item?.name }}
                                </p>
                                <p class="col">
                                    {{ item?.phoneNumber }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.rank }}
                                </p>
                                <p class="col">
                                    {{ Math.round(item?.user?.point).toFixed(0) }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.updatedAt?.slice(0,10) }}
                                </p>
                            </div>
                        </div>
                        <div class="count-page">
                            <div :class="[currentPage?.customer===index+1 ? 'current-page-number': '','page-number']" v-for="(item,index) in totalPage?.customer" :key="index" @click="handleNextPage('customer',index)">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                   
                </div>

            </div>
        </div>
    </div>
</template>