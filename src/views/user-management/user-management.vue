
<style scoped src="./user-management.css"></style>
<script lang="ts" src="./user-management.ts"></script>

<template>
    <ModalAddCustomer id="addCustomer" @handleClickActionButton="handleClick"/>
    <ModalCustomerDetail id="detailCustomer" :idCustomer="id" @handleClickActionButton="handleUpdate"/>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="min-height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >Customer</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Employee</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Manager</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px;">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" style="padding: 12px 24px; gap:12px; min-height: 100%;">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input" placeholder="Enter your's input"/>
                            </div>
                            <div class="col btn-add" data-bs-toggle="modal" data-bs-target="#addCustomer">
                                <i class="bi-person-fill-add" style="font-size:22px"></i>
                                <p>Add new customer</p>
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
                            <div class="person-item" v-for="(item, index) in 9" :key="index" data-bs-toggle="modal" data-bs-target="#detailCustomer">
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
                        <div class="d-flex flex-row justify-content-center align-items-center" style="margin-top: 8px; width: 100%; gap:8px">
                            <div class="page-number" v-for="(item,index) in 6" :key="index">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" style="padding: 12px 24px;gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input" placeholder="Enter your's input"/>
                            </div>
                            <div class="col btn-add">
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
                            <div class="person-item" v-for="(item, index) in 9" :key="index">
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
                        <div class="d-flex flex-row justify-content-center align-items-center" style="margin-top: 8px; width: 100%; gap:8px">
                            <div class="page-number" v-for="(item,index) in 6" :key="index">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" style="padding: 12px 24px; gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%">
                            <div class="col-1"></div>
                            <div class="col-6 d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input" placeholder="Enter your's input"/>
                            </div>
                            <div class="col btn-add">
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
                            <div class="person-item" v-for="(item, index) in 9" :key="index">
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
                        <div class="d-flex flex-row justify-content-center align-items-center" style="margin-top: 8px; width: 100%; gap:8px">
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