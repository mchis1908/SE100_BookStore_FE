
<style scoped src="./statistics.css"></style>
<script lang="ts" src="./statistics.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="line-chart-container">
                    <div class="line-header-container">
                        <p style="font-weight: 500; font-size: 16px; line-height: 100%">The Number Of Books Sold</p>
                        <div class="filter" @click="showModalSort.lineChart = !showModalSort.lineChart">
                            <img src="@/assets/filter/calendar.svg"/>
                            <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">{{ sortList.lineChart[selectedSort.lineChart] }}</p>
                            <img src="@/assets/home/arrowDown.svg" :style="showModalSort.lineChart ? 'transform: rotate(180deg)' : ''">
                            <Transition name="slide-fade">
                                <div v-if="showModalSort.lineChart" class="modal-sort">
                                    <div class="sort-item" v-for="(item, index) in sortList.lineChart" :key="index" @click="handleFilter('lineChart', index)" :style="selectedSort.lineChart === index ? 'font-weight: 500; color: #169C8A' : ''">{{ item }}</div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    <div class="line-chart">
                        <div>
                            <LineChart v-if="isChartReady && selectedSort?.lineChart === 0" :data="chart?.lineChart?.data7Days" :sortIndex="selectedSort?.lineChart"/>
                            <LineChart v-if="isChartReady && selectedSort?.lineChart === 1" :data="chart?.lineChart?.data30Days" :sortIndex="selectedSort?.lineChart"/>
                            <LineChart v-if="isChartReady && selectedSort?.lineChart === 2" :data="chart?.lineChart?.data12Months" :sortIndex="selectedSort?.lineChart"/>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row" style="gap:16px; height:100%">
                    <div class="col-8 line-chart-container">
                        <div class="line-header-container">
                            <p style="font-weight: 500; font-size: 16px; line-height: 100%">Revenue</p>
                            <div class="filter" @click="showModalSort.barChart = !showModalSort.barChart">
                                <img src="@/assets/filter/calendar.svg"/>
                                <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">{{ sortList.barChart[selectedSort.barChart] }}</p>
                                <img src="@/assets/home/arrowDown.svg" :style="showModalSort.barChart ? 'transform: rotate(180deg)' : ''">
                                <Transition name="slide-fade">
                                    <div v-if="showModalSort.barChart" class="modal-sort">
                                        <div class="sort-item" v-for="(item, index) in sortList.barChart" :key="index" @click="handleFilter('barChart', index)" :style="selectedSort.barChart === index ? 'font-weight: 500; color: #169C8A' : ''">{{ item }}</div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="bar-chart" style="height:100%">
                            <div>
                                <BarChart v-if="isChartReady && selectedSort?.barChart === 0" :data="chart?.barChart?.data7Days" :sortIndex="selectedSort?.barChart"/>
                            </div>
                        </div>
                    </div>
                    <div class="col line-chart-container">
                        <div class="line-header-container">
                            <p style="font-weight: 500; font-size: 16px; line-height: 100%">Sold By Category</p>
                            <div class="filter" @click="showModalSort.doughnutChart = !showModalSort.doughnutChart">
                                <img src="@/assets/filter/calendar.svg"/>
                                <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">{{ sortList.doughnutChart[selectedSort.doughnutChart] }}</p>
                                <img src="@/assets/home/arrowDown.svg" :style="showModalSort.doughnutChart ? 'transform: rotate(180deg)' : ''">
                                <Transition name="slide-fade">
                                    <div v-if="showModalSort.doughnutChart" class="modal-sort">
                                        <div class="sort-item" v-for="(item, index) in sortList.doughnutChart" :key="index" @click="handleFilter('doughnutChart', index)" :style="selectedSort.doughnutChart === index ? 'font-weight: 500; color: #169C8A' : ''">{{ item }}</div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="doughnut-chart" style="height:100%">
                            <div>
                                <DoughnutChart v-if="isChartReady && selectedSort?.doughnutChart === 0" :data="chart?.doughnutChart?.data7Days" :sortIndex="selectedSort?.doughnutChart"/>
                                <DoughnutChart v-if="isChartReady && selectedSort?.doughnutChart === 1" :data="chart?.doughnutChart?.data30Days" :sortIndex="selectedSort?.doughnutChart"/>
                                <DoughnutChart v-if="isChartReady && selectedSort?.doughnutChart === 2" :data="chart?.doughnutChart?.data12Months" :sortIndex="selectedSort?.doughnutChart"/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>