
<style scoped src="./expenses.css"></style>
<script lang="ts" src="./expenses.ts"></script>

<template>
    <ModalAddCustomer id="addSpend"/>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-problems-tab" data-bs-toggle="pill" data-bs-target="#pills-problems" type="button" role="tab" aria-controls="pills-problems" aria-selected="true" >Problems & Spends</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" type="button" role="tab" aria-controls="pills-history" aria-selected="false">History</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px; position: relative;">
                    <div class="tab-pane fade show active" id="pills-problems" role="tabpanel" aria-labelledby="pills-problems-tab" style="padding: 16px; gap:12px; min-height: 100%;">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%; gap:32px">
                            <div class="col-7 d-flex flex-row" style="gap:12px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input"/>
                            </div>
                            <div class="col-2 btn-add" data-bs-toggle="modal" data-bs-target="#addSpend">
                                <i class="bi-building-fill-add" style="font-size:22px"></i>
                                <p>New spend</p>
                            </div>
                            <div class="col d-flex flex-row justify-content-end" style="gap:12px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Filter:</div>
                                <input class="search-input input" type="date" placeholder="Enter your input" style="width:150px"/>
                            </div>
                        </div>
                        <div class="d-flex flex-row" style="flex-wrap: wrap; width:100%; gap:16px; margin:16px 0;  height: 510px; overflow:auto">
                            <div class="problem-item" v-for="(item,index) in 20" :key="index">
                                <div class="d-flex flex-column">
                                    <p class="text-title-1">Reason</p>
                                    <div class="d-flex flex-row" style="gap: 8px">
                                        <div style="width:4px; border-radius:4px; height:100%" :style="color[(index % 6)]"></div>
                                        <div class="d-flex flex-column">
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-pencil-fill"></i>
                                                <p>Description</p>
                                            </div>
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-alarm"></i>
                                                <p>Date report</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr style="margin:0"/>
                                <div class="d-flex flex-row" style="gap:16px">
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Reporter</p>
                                        <p>Reporter</p>
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Status</p>
                                        <p>Confirm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab" style="padding: 16px; gap:12px">
                        <div class="d-flex flex-row justify-content-between align-items-center" style="width:100%; gap:16px">
                            <div class="col d-flex flex-row" style="gap:16px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                                <input class="search-input input" placeholder="Enter your input"/>
                            </div>
                            <div class="filter" style="width:150px" @click="showModalSortList = !showModalSortList">
                                <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">{{ sortList[selectedSort] }}</p>
                                <img src="@/assets/home/arrowDown.svg" :style="showModalSortList ? 'transform: rotate(180deg)' : ''">
                                <Transition name="slide-fade">
                                    <div v-if="showModalSortList" class="modal-sort">
                                        <div class="sort-item" v-for="(item, index) in sortList" :key="index" @click="selectedSort = index" :style="selectedSort === index ? 'font-weight: 500; color: #065471' : ''">{{ item }}</div>
                                    </div>
                                </Transition>
                            </div>
                            <div class="d-flex flex-row justify-content-start" style="gap:16px; width:220px">
                                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Filter:</div>
                                <input class="search-input input" type="date" placeholder="Enter your input" style="width:150px"/>
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