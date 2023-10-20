
<style scoped src="./expenses.css"></style>
<script lang="ts" src="./expenses.ts"></script>

<template>
    <ModalAddExpense id="addSpend"/>
    <ModalDetailExpense id="detailSpend"/>
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
                    <div class="tab-pane fade show active" id="pills-problems" role="tabpanel" aria-labelledby="pills-problems-tab" style="padding: 16px; gap:12px;">
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
                                <input class="search-input input" type="date" placeholder="Enter your input" style="width:150px" v-model="filter.expenses.date"/>
                            </div>
                        </div>
                        <div class="d-flex flex-row" style="flex-wrap: wrap; width:100%; gap:16px; margin:16px 0; max-height: 510px; overflow:auto">
                            <div class="problem-item" v-for="(item,index) in expenses" :key="index" data-bs-toggle="modal" data-bs-target="#detailSpend" @click="handleDetailExpense(item)" v-motion-slide-left>
                                <div class="d-flex flex-column" style="gap:8px">
                                    <p class="text-title-1">{{item?.subject?? 'Subject'}}</p>
                                    <div class="d-flex flex-row" style="gap: 8px">
                                        <div style="width:4px; border-radius:4px; height:100%" :style="color[(index % 6)]"></div>
                                        <div class="d-flex flex-column" style="gap:8px">
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-pencil-fill"></i>
                                                <p>{{item?.description?.charAt(0).toUpperCase() + item.description.slice(1)}}</p>
                                            </div>
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-alarm"></i>
                                                <p>{{item?.createdAt?.slice(0,10)}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr style="margin:0"/>
                                <div class="d-flex flex-row" style="gap:16px">
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Reporter</p>
                                        <p>{{item?.reporter?.name}}</p>
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Status</p>
                                        <p :style="item.status==='PENDING'? 'color: #F3BB1B': (item.status==='RESOLVED'? 'color: #3DC13C':'color: #F13637')">{{item?.status?.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}}</p>
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
                            <div class="filter" @click="showModalSortList = !showModalSortList">
                                <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">Time:&nbsp;{{ sortList[selectedSortList] }}</p>
                                <img src="@/assets/home/arrowDown.svg" :style="showModalSortList ? 'transform: rotate(180deg)' : ''">
                                <Transition name="slide-fade">
                                    <div v-if="showModalSortList" class="modal-sort">
                                        <div class="sort-item" v-for="(item, index) in sortList" :key="index" @click="selectedSortList = index" :style="selectedSortList === index ? 'font-weight: 500; color: #065471' : ''">{{ item }}</div>
                                    </div>
                                </Transition>
                            </div>
                            <div class="filter" @click="showModalSortStatus = !showModalSortStatus">
                                <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">Status:&nbsp;{{ sortStatus[filter?.history?.status] }}</p>
                                <img src="@/assets/home/arrowDown.svg" :style="showModalSortStatus ? 'transform: rotate(180deg)' : ''">
                                <Transition name="slide-fade">
                                    <div v-if="showModalSortStatus" class="modal-sort">
                                        <div class="sort-item" v-for="(item, index) in sortStatus" :key="index" @click="filter.history.status= index" :style="filter?.history?.status === index ? 'font-weight: 500; color: #065471' : ''">{{ item }}</div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="d-flex flex-row" style="flex-wrap: wrap; width:100%; gap:16px; margin:16px 0;  max-height: 510px; overflow:auto">
                            <div class="problem-item" v-for="(item,index) in history" :key="index"  data-bs-toggle="modal" data-bs-target="#detailSpend" @click="handleDetailExpense(item)" v-motion-slide-left>
                                <div class="d-flex flex-column" style="gap:8px">
                                    <p class="text-title-1">{{item?.subject?? 'Subject'}}</p>
                                    <div class="d-flex flex-row" style="gap: 8px">
                                        <div style="width:4px; border-radius:4px; height:100%" :style="color[(index % 6)]"></div>
                                        <div class="d-flex flex-column" style="gap:8px">
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-pencil-fill"></i>
                                                <p>{{item?.description?.charAt(0).toUpperCase() + item.description?.slice(1)}}</p>
                                            </div>
                                            <div class="d-flex flex-row align-items-center" style="gap:8px">
                                                <i class="bi-alarm"></i>
                                                <p>{{item?.createdAt?.slice(0,10)}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr style="margin:0"/>
                                <div class="d-flex flex-row" style="gap:16px">
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Reporter</p>
                                        <p>{{item?.reporter?.name}}</p>
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <p class="text-title-1">Status</p>
                                        <p :style="item.status==='PENDING'? 'color: #F3BB1B': (item.status==='RESOLVED'? 'color: #3DC13C':'color: #F13637')">{{item?.status?.charAt(0).toUpperCase() + item.status?.slice(1).toLowerCase()}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>