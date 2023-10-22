
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
                    <input class="search-input input" placeholder="Enter barcode or name of book" v-model="searchQuery"/>
                </div>
                <!-- <Barcode/> -->
                <div class="book-container">
                    <div class="book-item" v-for="(item, index) in books" :key="index">
                        <img v-if="item?.image" :src="item?.image" style="height:120px; object-fit:contain;z-index:0"/>
                        <img v-else src="@/assets/book-page/book-default.png" style="height:120px; object-fit:contain;z-index:0"/>
                        <div class="d-flex flex-column justify-content-center align-items-center" style="gap:8px; height:100%; z-index:0">
                            <div class="book-item-text">
                                <p style="font-weight:600">Name:</p>
                                <p>{{item?.name}}</p>
                            </div>
                            <div class="book-item-text">
                                <p style="font-weight:600">Author:</p>
                                <p>{{item?.author}}</p>
                            </div>
                            <div class="d-flex flex-row justify-content-between" style="width:100%">
                                <div :class="[item?.discountValue>0? 'book-item-text-line':'', 'book-item-text']">
                                    <p>Price:</p>
                                    <p>{{item?.salesPrice}}</p>
                                </div>
                                <div v-if="item?.discountValue>0" class="book-item-text-sale book-item-text justify-content-end">
                                    <p>Price:</p>
                                    <p>{{item?.salesPrice * (1- item?.discountValue)}}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="item?.discountValue>0" class="sale-container">
                            <p>{{item?.discountValue * 100 }}% OFF</p>
                        </div>
                        <div class="add-to-cart" @click="handleAddBookByClick(item)">
                            <i class="bi-cart-plus" style="font-size:40px; color:#fff"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 d-flex flex-column" style="border-left: solid 1px #E5E6E6; padding:12px; gap:12px; position:relative">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <p class="text-start text-title-1" style="font-size:16px; color:#065471">Detail Invoice</p>
                    <p class="text-end" style="color:#ADADAD">2023-10-15</p>
                </div>
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <div class="input-field align-items-center" style="gap:16px">
                    <div class="d-flex justify-content-start align-items-center" style="font-weight:600; font-size:14px">Customer:</div>
                    <input v-if="!selectCustomer" class="search-input input" placeholder="Enter customer information" v-model="customerInput"/>
                    <div v-else style="
                        display: flex;
                        height: 40px;
                        padding: 8px;
                        align-items: center;
                        gap: 16px;
                        align-self: stretch;
                        border-radius: 12px;
                        outline: 1px solid var(--neutral-06-day, #D6D6D6);
                    ">
                        <div class="d-flex flex-row p-1 gap-2"  
                        style="border-radius: 8px; background: var(--second-04, #E8F3EC); width: fit-content;">
                        <p>{{ selectCustomer?.name}}</p>
                        <img src="@/assets/selling-books/remove.svg" style="cursor:pointer" @click="handleRemoveCustomer()"/>
                        </div>
                    </div>
                </div>
                <div style="position:relative">
                    <div v-if="customerInput && suggest?.length!==0" class="text-start p-2 d-flex flex-column suggest">
                        <div class="d-flex flex-column" v-for="(item,index) in suggest" :key="index" @click="handleSelectCustomer(item)" style="cursor:pointer; gap:8px">
                            <p style="color: var(--neutral-darkest, #2B2B2B); font-size: 16px; font-weight: 600; line-height: 150%;">Name: {{item?.name || 'N/A'}}</p>
                            <p style="color: var(--neutral-darkest, #ADADAD); font-size: 14px; font-weight: 400; line-height: 150%;">Phone: {{item?.phoneNumber || 'N/A'}}</p>
                        </div>
                    </div>
                </div> 
                    
                
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <div class="input-field align-items-center" style="gap:16px">
                    <div class="d-flex justify-content-start align-items-center" style="font-weight:600; font-size:14px">Voucher:</div>
                    <div class="d-flex flex-column" style="gap:4px">
                        <select v-model="selectVoucher" class="input d-flex align-items-center" style="padding:0 8px; height:40px">
                            <option :value="null" disabled selected>Select voucher</option>
                            <option style="height:30px" v-for="(item, index) in vouchers" :key="index" :value="item">Name:{{item?.name}} - Discount value: {{item?.discountValue * 100}}%</option>
                        </select>
                    </div>
                </div>
                <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                <p class="text-start" style="font-weight:600; font-size:14px">Order Detail:</p>
                <div class="d-flex flex-row justify-content-between" style="padding:0 4px; gap:4px">
                    <p class="col text-start" style="font-weight:600; max-width:180px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">Book</p>
                    <p class="col text-center" style="font-weight:600; max-width:80px">Quantity</p>
                    <p class="col-2 text-end" style="font-weight:600;">Unit price</p>
                    <p class="col-2 text-end" style="font-weight:600">Cost</p>
                    <p style="width:30px">&nbsp;</p>
                </div>
                <div class="d-flex flex-column" style="gap:8px; max-height:230px; overflow:auto">
                    <div class="d-flex flex-row justify-content-between book-in-cart" v-for="(item,index) in bookInCart" :key="index" style="padding:4px; gap:4px" v-motion-slide-left>
                        <p class="col text-start" style="max-width:180px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">{{item?.name}}</p>
                        <input class="col text-center add-scale" type="number" style="max-width:80px" :min="1" :max="item?.quantity" v-model="quantity[index]" />
                        <p class="col-2 text-end">{{item?.salesPrice * (1-item?.discountValue)}}</p>
                        <p class="col-2 text-end">{{cost[index]}}</p>
                        <div style="width:30px">
                            <i class="bi-trash delete-item" style="color:red; font-size:20px" @click="handleDeleteBook(index)"></i>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column" style="gap:8px; position:absolute; bottom:10px; width:calc(100% - 32px)">
                    <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Subtotal:</p>
                        <p style="font-weight:600; font-size:14px">{{subtotal}}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Voucher discount:</p>
                        <p style="font-weight:600; font-size:14px">{{voucherDiscount}}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="gap:16px">
                        <p style="font-weight:600; font-size:14px">Total:</p>
                        <p style="font-weight:600; font-size:14px">{{total}}</p>
                    </div>
                    <button class="button-solid" @click="handlePay">Pay</button>
                </div>
                
            </div>
        </div>
    </div>
</template>