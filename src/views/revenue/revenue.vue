
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
                            <input class="search-input input" type="month" placeholder="Enter your input" style="width:150px"/>
                        </div>
                        <div class="button-solid-small d-flex flex-row justify-content-start align-items-center" style="border-radius:8px; gap:8px; height:30px;">
                            <i class="bi-printer-fill"></i>
                            <p>Print Report </p>
                        </div>
                    </div>
                    <p style="font-size:32px; font-weight:600; color: rgb(6, 84, 113); margin-top:20px">August 2023 Revenue Report</p>
                    <div class="d-flex flex-column" style="gap:12px; padding: 0 36px; width:90%" v-motion-slide-left>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr class="text-start">
                                    <th scope="col">&nbsp;</th>
                                    <th scope="col">Scale</th>
                                    <th scope="col">Coefficient</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr class="book-row text-start" v-for="(item, index) in revenue" :key="index">
                                    <th scope="row">{{ item?.title }}</th>
                                    <td>{{ item?.cost }}</td>
                                    <td>{{ item?.cost }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>