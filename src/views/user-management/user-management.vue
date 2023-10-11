
<style scoped src="./user-management.css"></style>
<script lang="ts" src="./user-management.ts"></script>

<template>
    <ModalAddCustomer id="addCustomer"/>
    <ModalAddEmployee id="addEmployee"/>
    <ModalAddManager id="addManager"/>
    <ModalCustomerDetail id="detailCustomer" :idCustomer="detail?.customerId"/>
    <ModalEmployeeDetail id="detailEmployee" :idCustomer="detail?.employeeId"/>
    <ModalManagerDetail id="detailManager" :idCustomer="detail?.managerId"/>
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
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-manager-tab" data-bs-toggle="pill" data-bs-target="#pills-manager" type="button" role="tab" aria-controls="pills-manager" aria-selected="false">Manager</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px; position: relative;">
                    <div class="tab-pane fade show active" id="pills-customer" role="tabpanel" aria-labelledby="pills-customer-tab" style="padding: 16px; gap:12px; min-height: 100%;">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input"/>
                            </div>
                            <div class="col btn-add" data-bs-toggle="modal" data-bs-target="#addCustomer">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new customer</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="gap:12px; margin-top: 24px;" v-motion-slide-left>
                            <div class="d-flex flex-row">
                                <div class="col text-title-1">
                                    Name
                                </div>
                                <div class="col text-title-1">
                                    Phone Number
                                </div>
                                <div class="col text-title-1">
                                    Rank
                                </div>
                                <div class="col text-title-1">
                                    Point
                                </div>
                                <div class="col text-title-1">
                                    Last Transaction
                                </div>
                            </div>
                            <div class="person-item" v-for="(item, index) in list?.customer" :key="index" data-bs-toggle="modal" data-bs-target="#detailCustomer" @click="handleDetailCustomer(item)">
                                <p class="col">
                                    {{ item?.name }}
                                </p>
                                <p class="col">
                                    {{ item?.phoneNumber }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.membershipCard?.rank }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.membershipCard?.point }}
                                </p>
                                <p class="col">
                                    {{ item?.user?.membershipCard?.lastTransaction.slice(0,10) }}
                                </p>
                            </div>
                        </div>
                        <div class="count-page">
                            <div :class="[currentPage?.customer===index+1 ? 'current-page-number': '','page-number']" v-for="(item,index) in totalPage?.customer" :key="index" @click="handleNextPage(index)">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-employee" role="tabpanel" aria-labelledby="pills-employee-tab" style="padding: 16px;gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input"/>
                            </div>
                            <div class="col btn-add" data-bs-toggle="modal" data-bs-target="#addEmployee">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new employee</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="gap:12px; margin-top: 24px;">
                            <div class="d-flex flex-row">
                                <div class="col text-title-1">
                                    Name
                                </div>
                                <div class="col text-title-1">
                                    Phone Number
                                </div>
                                <div class="col text-title-1">
                                    Rank
                                </div>
                                <div class="col text-title-1">
                                    Point
                                </div>
                                <div class="col text-title-1">
                                    Last Transaction
                                </div>
                            </div>
                            <div class="person-item" v-for="(item, index) in 9" :key="index" data-bs-toggle="modal" data-bs-target="#detailEmployee" @click="handleDetailEmployee(item)">
                                <p class="col">
                                    Huỳnh Minh Chí
                                </p>
                                <p class="col">
                                    {{ index }}
                                </p>
                                <p class="col">
                                    {{ index }}
                                </p>
                                <p class="col">
                                    01/01/2023
                                </p>
                                <p class="col">
                                    01/01/2023
                                </p>
                            </div>
                        </div>
                        <div class="count-page">
                            <div class="page-number" v-for="(item,index) in 6" :key="index">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-manager" role="tabpanel" aria-labelledby="pills-manager-tab" style="padding: 16px; gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input"/>
                            </div>
                            <div class="col btn-add" data-bs-toggle="modal" data-bs-target="#addManager">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new manager</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="gap:12px; margin-top: 24px;">
                            <div class="d-flex flex-row">
                                <div class="col text-title-1">
                                    Name
                                </div>
                                <div class="col text-title-1">
                                    Rank
                                </div>
                                <div class="col text-title-1">
                                    Point
                                </div>
                                <div class="col text-title-1">
                                    Last Transaction
                                </div>
                            </div>
                            <div class="person-item" v-for="(item, index) in 9" :key="index" data-bs-toggle="modal" data-bs-target="#detailManager" @click="handleDetailManager(item)">
                                <p class="col">
                                    Huỳnh Minh Chí
                                </p>
                                <p class="col">
                                    {{ index }}
                                </p>
                                <p class="col">
                                    {{ index }}
                                </p>
                                <p class="col">
                                    01/01/2023
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
    </div>
</template>