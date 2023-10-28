
<style scoped src="./revenue.css"></style>
<script lang="ts" src="./revenue.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1;" v-motion-slide-left>
                <div class="d-flex flex-column align-items-center" style="background: #fff; width:100%; padding:24px; height:100%; position: relative; border-radius:16px">
                    <div class="d-flex flex-row justify-content-end align-items-center" style="width:100%; gap:16px">
                        <div class="d-flex flex-row justify-content-start" style="gap:16px; width:220px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Filter:</div>
                            <input class="search-input input" type="month" placeholder="Enter your input" style="width:150px" v-model="time"/>
                        </div>
                        <xlsx-workbook>
                            <xlsx-sheet
                                :collection="sheets?.data"
                                :sheet-name="formatDate(time)+' Revenue Report'"
                            />
                            <xlsx-download :filename="formatDate(time)+ ' Revenue Report.xlsx'">
                                <div @click="download" class="button-solid-small d-flex flex-row justify-content-start align-items-center" style="border-radius:8px; gap:8px; height:30px;">
                                    <i class="bi-printer-fill"></i>
                                    <p>Print Report </p>
                                </div>
                            </xlsx-download>
                        </xlsx-workbook>
                    </div>
                    <p style="font-size:32px; font-weight:600; color: rgb(6, 84, 113); margin-top:20px">{{formatDate(time)}} Revenue Report </p>
                    <Loading v-if="isLoading" />
                    <div v-else class="d-flex flex-column" style="gap:12px; padding: 0 36px; width:90%" v-motion-slide-left>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr class="text-start">
                                    <th>&nbsp;</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr class="text-start" v-for="(item, index) in revenue" :key="index">
                                    <th>{{ titleRevenue[index] }}</th>
                                    <td>{{ fixedCurrency(item?.current) }}</td>
                                    <td>
                                        <div class="d-flex flex-row" style="gap:4px">
                                            <div :style="item?.difference>1 && item?.current>0 ? 'color:#64C550': 'color:#FF513C'">{{ item?.difference * 100  }}%</div>
                                            <img v-if="item?.difference>1 && item?.current>0" :src="require(`@/assets/revenue/upArrow.svg`)"/>
                                            <img v-else :src="require(`@/assets/revenue/downArrow.svg`)"/>
                                            <p style="color:#BABCC2">Since last month</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>