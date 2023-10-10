
<style scoped src="./expenses.css"></style>
<script lang="ts" src="./expenses.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="min-height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-problems-tab" data-bs-toggle="pill" data-bs-target="#pills-problems" type="button" role="tab" aria-controls="pills-problems" aria-selected="true" >Problems</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-spend-tab" data-bs-toggle="pill" data-bs-target="#pills-spend" type="button" role="tab" aria-controls="pills-spend" aria-selected="false">Spend</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" type="button" role="tab" aria-controls="pills-history" aria-selected="false">History</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px; position: relative;">
                    <div class="tab-pane fade show active" id="pills-problems" role="tabpanel" aria-labelledby="pills-problems-tab" style="padding: 12px 24px; gap:12px; min-height: 100%;">
                        <div class="count-page">
                            <div :class="[currentPage?.customer===index+1 ? 'current-page-number': '','page-number']" v-for="(item,index) in totalPage?.customer" :key="index" @click="handleNextPage(index)">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-spend" role="tabpanel" aria-labelledby="pills-spend-tab" style="padding: 12px 24px;gap:12px">
                        <div class="count-page">
                            <div class="page-number" v-for="(item,index) in 6" :key="index">
                                <p>{{ index+1 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab" style="padding: 12px 24px; gap:12px">
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