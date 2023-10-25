
<style scoped src="./user-management.css"></style>
<script lang="ts" src="./user-management.ts"></script>

<template>
    <ModalAddCustomer id="addCustomer"/>
    <ModalSetting id="setting"/>
    <ModalAddEmployee id="addEmployee"/>
    <ModalCustomerDetail id="detailCustomer" :idCustomer="detail?.customerId"/>
    <ModalEmployeeDetail id="detailEmployee" :idCustomer="detail?.employeeId"/>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-customer-tab" data-bs-toggle="pill" data-bs-target="#pills-customer" type="button" role="tab" aria-controls="pills-customer" aria-selected="true" >Customer</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-employee-tab" data-bs-toggle="pill" data-bs-target="#pills-employee" type="button" role="tab" aria-controls="pills-employee" aria-selected="false">Employee</button>
                    </li>
                </ul>
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
                    <div class="tab-pane fade" id="pills-employee" role="tabpanel" aria-labelledby="pills-employee-tab" style="padding: 16px;gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-7 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input" v-model="searchQuery.employee"/>
                            </div>
                            <div class="col-2 btn-add" data-bs-toggle="modal" data-bs-target="#addEmployee">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new employee</p>
                            </div>
                            <div class="btn-add" data-bs-toggle="modal" data-bs-target="#setting">
                                <i class="bi-gear-fill" style="font-size:22px"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="gap:10px; margin-top: 24px;">
                            <div class="d-flex flex-row">
                                <div class="col title-1">
                                    Name
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['employee']['name'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('employee', 'name')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Phone Number
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['employee']['phoneNumber'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('employee', 'phoneNumber')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Email
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['employee']['email'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('employee', 'email')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Seniority
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['employee']['seniority'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('employee', 'seniority')"></i></span> -->
                                </div>
                                <div class="col title-1">
                                    Start Day
                                    <!-- <span><i class="bi-sort-down-alt" :class="selectSort['employee']['startDay'] ? 'activeSort':''" style="font-size:24px" @click="handleSort('employee', 'startDay')"></i></span> -->
                                </div>
                            </div>
                            <div class="person-item" v-for="(item, index) in list?.employee" :key="index" data-bs-toggle="modal" data-bs-target="#detailEmployee" @click="handleDetailEmployee(item)"  v-motion-slide-left>
                                <p class="col">
                                    {{ item?.name }}
                                </p>
                                <p class="col">
                                    {{ item?.phoneNumber }}
                                </p>
                                <p class="col">
                                    {{ item?.email }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.seniority }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.startDateOfWork?.slice(0,10) }}
                                </p>
                            </div>
                        </div>
                        <div class="count-page">
                            <div :class="[currentPage?.employee===index+1 ? 'current-page-number': '','page-number']" v-for="(item,index) in totalPage?.employee" :key="index" @click="handleNextPage('employee',index)">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>