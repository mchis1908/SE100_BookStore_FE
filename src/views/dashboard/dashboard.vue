
<style scoped src="./dashboard.css"></style>
<script lang="ts" src="./dashboard.ts"></script>

<template>
    <Modal id="seeDetailsModal" title="Modal See Details" content="Details of books" actionButtonTitle="Save" :isDangerAction="false" @handleClickActionButton="handleClick"/>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <!-- ---------overview--- -->   
                <div class="d-flex flex-column align-items-start" style="gap:8px">
                    <p class="areaContent-title">Over Views</p>
                    <div class="d-flex flex-row" style="gap:32px; width:100%">
                        <div class="block-overview col d-flex flex-column">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex flex-row align-items-start" style="gap:8px">
                                    <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                    <div class="d-flex flex-column align-items-start" style="gap:8px">
                                        <p>Customer</p>
                                        <p>12345</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="bi-person-circle" style="font-size:32px"></i>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                                <i class="bi-arrow-up" ></i>
                                <p>
                                    3.23%
                                    <span style="color:#BABCC2">
                                        Since last week
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="block-overview col d-flex flex-column">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex flex-row align-items-start" style="gap:8px">
                                    <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                    <div class="d-flex flex-column align-items-start" style="gap:8px">
                                        <p>Customer</p>
                                        <p>12345</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="bi-person-circle" style="font-size:32px"></i>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                                <i class="bi-arrow-up" ></i>
                                <p>
                                    3.23%
                                    <span style="color:#BABCC2">
                                        Since last week
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="block-overview col d-flex flex-column">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex flex-row align-items-start" style="gap:8px">
                                    <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                    <div class="d-flex flex-column align-items-start" style="gap:8px">
                                        <p>Customer</p>
                                        <p>12345</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="bi-person-circle" style="font-size:32px"></i>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                                <i class="bi-arrow-up" ></i>
                                <p>
                                    3.23%
                                    <span style="color:#BABCC2">
                                        Since last week
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="block-overview col d-flex flex-column">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex flex-row align-items-start" style="gap:8px">
                                    <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                    <div class="d-flex flex-column align-items-start" style="gap:8px">
                                        <p>Customer</p>
                                        <p>12345</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="bi-person-circle" style="font-size:32px"></i>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                                <i class="bi-arrow-up" ></i>
                                <p>
                                    3.23%
                                    <span style="color:#BABCC2">
                                        Since last week
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    <!-- ---------statics & customer------- -->
                <div class="d-flex flex-row" style="gap:32px">
                    <div class="col-8 line-chart-container" style="gap:8px">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <p class="areaContent-title">The Number Of Books Sold Last 7 days</p>
                        </div>
                        <div class="line-chart" style="height:100%">
                            <div class="d-flex flex-column" style="gap:8px">
                                <LineChart v-if="isChartReady && selectedSort?.lineChart === 0" :data="chart?.lineChart?.data7Days" :sortIndex="selectedSort?.lineChart"/>
                                <div class="d-flex justify-content-end" style="width:100%">
                                    <router-link to="/statistics">
                                        <div class="d-flex flex-row see-detail">
                                            <p >See Detail</p>
                                            <i class="bi-arrow-right"></i>
                                        </div>
                                    </router-link> 
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col text-start d-flex flex-column" style="gap:8px">
                        <p class="areaContent-title">Best Selling Books</p>
                        <div class="areaContent-bg">
                            <div class="areaContent-bg">
                                <div class="d-flex flex-row" style="gap:8px">
                                    <p class="col-1 text-title-1">
                                        No
                                    </p>
                                    <p class="col text-title-1">
                                        Book's Name
                                    </p>
                                    <p class="col-2 text-title-1">
                                        Quantity
                                    </p>
                                </div>
                                <div class="d-flex flex-row" style="gap:8px" v-for="(item,index) in 10" :key="index">
                                    <p class="col-1 text-center">
                                        {{ index + 1 }}
                                    </p>
                                    <p class="col text-center">
                                        Đắc nhân tâm
                                    </p>
                                    <p class="col-2 text-center">
                                        {{  30 + index }}
                                    </p>
                                </div>
                                <div class="d-flex justify-content-end" style="width:100%">
                                    <router-link to="/book-management">
                                        <div class="d-flex flex-row see-detail">
                                            <p >See Detail</p>
                                            <i class="bi-arrow-right"></i>
                                        </div>
                                    </router-link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ---------recent invoice & book pre-order------- -->
                <div class="d-flex flex-row" style="gap:32px;">
                    <div class="col-4 text-start d-flex flex-column" style="gap:8px">
                        <p class="areaContent-title">Loyal Customers</p>
                        <div class="areaContent-bg">
                            <div class="d-flex flex-row" style="gap:8px">
                                <p class="col-1 text-title-1">
                                    No
                                </p>
                                <p class="col text-title-1">
                                    Name
                                </p>
                                <p class="col-2 text-title-1">
                                    Point
                                </p>
                            </div>
                            <div class="d-flex flex-row" style="gap:8px" v-for="(item,index) in list?.customers" :key="index">
                                <p class="col-1 text-center">
                                    {{ index + 1 }}
                                </p>
                                <p class="col text-center">
                                    {{item?.name}}
                                </p>
                                <p class="col-2 text-center">
                                    {{ Math.round(item?.user?.point).toFixed(0) }}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end" style="width:100%">
                                <router-link to="/user-management">
                                    <div class="d-flex flex-row see-detail">
                                        <p >See Detail</p>
                                        <i class="bi-arrow-right"></i>
                                    </div>
                                </router-link> 
                            </div>
                        </div>
                    </div>
                    
                    <div class="col text-start d-flex flex-column" style="gap:8px;">
                        <p class="areaContent-title">Recent Invoices</p>
                        <div class="areaContent-bg">
                            <div class="d-flex flex-row" style="gap:8px">
                                <p class="col-1 text-title-1">
                                    No
                                </p>
                                <p class="col text-title-1">
                                    Date Created
                                </p>
                                <p class="col text-title-1">
                                    Customer
                                </p>
                                <p class="col text-title-1">
                                    Amount
                                </p>
                                <p class="col text-title-1">
                                    Cashier
                                </p>
                            </div>
                            <div class="d-flex flex-row" style="gap:8px" v-for="(item,index) in 10" :key="index">
                                <p class="col-1 text-center">
                                    {{ index + 1 }}
                                </p>
                                <p class="col text-center">
                                    1/{{ index+1 }}/2023
                                </p>
                                <p class="col text-center">
                                    Huỳnh Minh Chí
                                </p>
                                <p class="col text-center">
                                    {{30 * index+1}}.000
                                </p>
                                <p class="col text-center">
                                    Huỳnh Minh Chí
                                </p>
                            </div>
                            <div class="d-flex justify-content-end" style="width:100%">
                                <router-link to="/invoices">
                                    <div class="d-flex flex-row see-detail">
                                        <p >See Detail</p>
                                        <i class="bi-arrow-right"></i>
                                    </div>
                                </router-link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
        </div>
    </div>
</template>