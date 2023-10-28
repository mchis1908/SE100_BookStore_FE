
<style scoped src="./dashboard.css"></style>
<script lang="ts" src="./dashboard.ts"></script>

<template>
    <Modal id="seeDetailsModal" title="Modal See Details" content="Details of books" actionButtonTitle="Save" :isDangerAction="false" @handleClickActionButton="handleClick"/>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <Loading v-if="isLoading" />
            <div v-else class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <!-- ---------overview--- -->   
                <div class="d-flex flex-column align-items-start" style="gap:8px">
                    <p class="areaContent-title">Overviews</p>
                    <div class="d-flex flex-row" style="gap:32px; width:100%">
                        <div class="block-overview col d-flex flex-column" v-for="(item,index) in overViews" :key="index">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex flex-row align-items-start" style="gap:8px">
                                    <div style="width:4px; background-color: #065471; border-radius: 8px; height: 100%;"></div>
                                    <div class="d-flex flex-column align-items-start" style="gap:8px">
                                        <p style="text-transform: Capitalize">{{index}}</p>
                                        <p>{{fixedCurrency(item?.current)}}</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center" style="color:#065471">
                                    <i v-if="index==='selling'" class="bi-receipt" style="font-size:40px"></i>
                                    <i v-else-if="index==='expense'" class="bi-currency-exchange" style="font-size:40px"></i>
                                    <i v-else class="bi-cash-coin" style="font-size:40px"></i>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                                <img v-if="item?.difference>1" :src="require(`@/assets/revenue/upArrow.svg`)"/>
                                <img v-else :src="require(`@/assets/revenue/downArrow.svg`)"/>
                                <p :style="item?.difference>1 ? 'color:#64C550': 'color:#FF513C'">
                                    {{ item?.difference * 100  }}%
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
                            <p class="areaContent-title">Revenue Last 7 Days</p>
                        </div>
                        <div class="line-chart" style="height:100%; position: relative;">
                            <div class="d-flex flex-column" style="gap:8px; ">
                                <LineChart v-if="isChartReady && selectedSort?.lineChart === 0" :data="chart?.lineChart?.data7Days" :sortIndex="selectedSort?.lineChart"/>
                                <div class="d-flex justify-content-end" style="width:100; position: absolute; bottom:10px; right:10px">
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
                            <div class="d-flex flex-row" style="gap:8px" v-for="(item,index) in list.books" :key="index">
                                <p class="col-1 text-center">
                                    {{ index + 1 }}
                                </p>
                                <p class="col text-center">
                                    {{item?.name}}
                                </p>
                                <p class="col-2 text-center">
                                    {{item?.totalQuantity}}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end" style="width:100; position: absolute; bottom:10px; right:10px">
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
                            <div class="d-flex justify-content-end" style="width:100; position: absolute; bottom:10px; right:10px">
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
                            <div class="d-flex flex-row" style="gap:8px" v-for="(item,index) in list?.invoices" :key="index">
                                <p class="col-1 text-center">
                                    {{ index + 1 }}
                                </p>
                                <p class="col text-center">
                                    {{item?.createdAt?.slice(0,10)}}
                                </p>
                                <p class="col text-center">
                                    {{item?.customer?.name}}
                                </p>
                                <p class="col text-center">
                                    {{fixedCurrency(item?.total)}}
                                </p>
                                <p class="col text-center">
                                    {{item?.employee?.name}}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end" style="width:100; position: absolute; bottom:10px; right:10px">
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