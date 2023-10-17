
<style scoped src="./selling-books.css"></style>
<script lang="ts" src="./selling-books.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="d-flex flex-row" style="gap:16px">
                    <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                    <input class="search-input input" placeholder="Enter barcode or name of book"/>
                </div>
                <div class="book-container">
                    <div class="book-item" v-for="(item, index) in 18" :key="index">
                        <img src="@/assets/home/dacnhatam-book.webp" style="height:120px; object-fit:contain"/>
                        <div class="d-flex flex-column justify-content-center align-items-center" style="gap:8px; height:100%">
                            <div class="book-item-text">
                                <p>Name:</p>
                                <p>Nguyen Duy Linhiiii</p>
                            </div>
                            <div class="book-item-text">
                                <p>Author:</p>
                                <p>Nguyen Duy Linh</p>
                            </div>
                            <div class="book-item-text">
                                <p class="">Price:</p>
                                <p class="">100.000</p>
                                <p class="text-bolder">VND</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3 d-flex flex-column" style="border-left: solid 1px #E5E6E6; padding:24px; gap:12px; position:relative">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="text-start text-title-1" style="font-size:16px; color:#065471">Detail Invoice</p>
                    <p class="text-end" style="color:#ADADAD">2023-10-15</p>
                </div>
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <div class="d-flex flex-row" style="gap:16px">
                    <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px">Customer:</div>
                    <input class="search-input input" placeholder="Enter customer information"/>
                </div>
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <div class="d-flex flex-row" style="gap:16px">
                    <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px">Voucher:</div>
                    <input class="search-input input" placeholder="Enter customer information"/>
                </div>
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <p class="text-start text-title-1" style="font-size:16px; color:#065471">Detail order</p>
                <div class="d-flex flex-column text-start" style="gap:8px; max-height:280px; overflow:auto">
                    <div class="d-flex flex-row justify-content-center">
                        <p class="col-2 text-center">No</p>
                        <p class="col text-center">Book</p>
                        <p class="col-2 text-end">Quantity</p>
                        <p class="col-3 text-end">Cost</p>
                    </div>
                    <div class="d-flex flex-row justify-content-center" v-for="(item,index) in 50" :key="index">
                        <p class="col-2 text-center">{{index+1}}</p>
                        <p class="col text-center">Book{{index *2}}</p>
                        <p class="col-2 text-end">{{index *2}}</p>
                        <p class="col-3 text-end">{{index *2}}</p>
                    </div>
                </div>
                <div class="d-flex flex-column" style="gap:8px; position:absolute; bottom:20px; width:calc(100% - 32px)">
                    <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Subtotal:</p>
                        <p style="font-weight:600; font-size:14px">300000</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Voucher:</p>
                        <p style="font-weight:600; font-size:14px">30%</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Discount:</p>
                        <p style="font-weight:600; font-size:14px">10%</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Total:</p>
                        <p style="font-weight:600; font-size:14px">300000</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>