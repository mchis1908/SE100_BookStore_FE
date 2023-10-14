
<style scoped src="./events.css"></style>
<script lang="ts" src="./events.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >Events</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Vouchers</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px; height: 580px;">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" style="padding: 12px 24px; gap:12px; min-height: 100%;">
                        Events
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" style="padding: 12px 24px; gap:12px;">
                        <div class="d-flex flex-row justify-content-center align-items-center" style="width:100%">
                            <div class="d-flex" style="gap:16px; width: 40%">
                                <label for="search-input" class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</label>
                                <input name="search-input" class="search-input input" placeholder="Enter your input"/>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center w-100 mt-5" style="gap: 3%">
                            <VoucherItem v-for="(item, index) in vouchers" :key="index" :voucher="vouchers[index]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>