
<style scoped src="./dashboard.css"></style>
<script lang="ts" src="./dashboard.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="min-height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px">
                <div class="d-flex flex-row" style="gap:32px">
                    <div class="block-overview col d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-start" style="gap:8px">
                                <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                <div class="d-flex flex-column align-items-start" style="gap:8px">
                                    <p>Customer</p>
                                    <p>12345</p>
                                </div>
                            </div>
                            <div>
                                <i class="bi bi-person-circle" style="font-size:32px"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                            <i class="bi bi-arrow-up" ></i>
                            <p>
                                3.23%
                                <span style="color:#BABCC2">
                                    Since last week
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="block-overview col d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-start" style="gap:8px">
                                <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                <div class="d-flex flex-column align-items-start" style="gap:8px">
                                    <p>Customer</p>
                                    <p>12345</p>
                                </div>
                            </div>
                            <div>
                                <i class="bi bi-person-circle" style="font-size:32px"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                            <i class="bi bi-arrow-up" ></i>
                            <p>
                                3.23%
                                <span style="color:#BABCC2">
                                    Since last week
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="block-overview col d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-start" style="gap:8px">
                                <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                <div class="d-flex flex-column align-items-start" style="gap:8px">
                                    <p>Customer</p>
                                    <p>12345</p>
                                </div>
                            </div>
                            <div>
                                <i class="bi bi-person-circle" style="font-size:32px"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                            <i class="bi bi-arrow-up" ></i>
                            <p>
                                3.23%
                                <span style="color:#BABCC2">
                                    Since last week
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="block-overview col d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-start" style="gap:8px">
                                <div style="width:4px; background-color:blue; border-radius: 8px; height: 100%;"></div>
                                <div class="d-flex flex-column align-items-start" style="gap:8px">
                                    <p>Customer</p>
                                    <p>12345</p>
                                </div>
                            </div>
                            <div>
                                <i class="bi bi-person-circle" style="font-size:32px"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-start align-items-center" style="gap:8px;color:green">
                            <i class="bi bi-arrow-up" ></i>
                            <p>
                                3.23%
                                <span style="color:#BABCC2">
                                    Since last week
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>