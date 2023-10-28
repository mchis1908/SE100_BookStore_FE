
<style scoped src="./refunds.css"></style>
<script lang="ts" src="./refunds.ts"></script>

<template>
    <div
    class="modal fade"
    id="modal-detail-invoice"
    ref="modal-detail-invoice"
    tabindex="-1"
    aria-labelledby="pricingConfirmModalLabel"
    aria-hidden="true"
    >
        <ModalDetailInvoice/>
    </div>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:12px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="input-field align-items-center" style="gap:16px; padding: 0 0 0 12px;">
                    <div class="d-flex justify-content-start align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                    <input v-if="!isInvoice" class="search-input input" placeholder="Enter barcode of invoice" v-model="searchInvoice"/>
                    <div v-else style="
                        display: flex;
                        height: 40px;
                        padding: 8px;
                        align-items: center;
                        gap: 16px;
                        align-self: stretch;
                        border-radius: 12px;
                        outline: 1px solid var(--neutral-06-day, #D6D6D6);
                        width: 100%;
                    ">
                        <div class="d-flex flex-row p-1 gap-2"
                            style="border-radius: 8px; background: var(--second-04, #E8F3EC); width: fit-content;">
                            <p>{{ searchInvoice }}</p>
                            <img src="@/assets/selling-books/remove.svg" style="cursor:pointer"
                                @click="handleRemoveInvoice()" />
                        </div>
                    </div>
                </div>
                <!-- <Barcode/> -->
                <div class="d-flex flex-column" style="gap:12px; position:relative; height: calc( 100% - 64px); background:#fff; padding:24px 12px; border-radius:16px">
                    <div class="input-field align-items-center" style="gap:16px">
                        <div class="d-flex justify-content-start align-items-center" style="font-weight:600; font-size:14px">Customer:</div>
                        <input class="search-input input" placeholder="Enter customer information" :value="invoice?.customer?.name" disabled/>
                    </div>
                    <div class="input-field align-items-center" style="gap:16px; width:100%">
                        <div class="d-flex justify-content-start align-items-center" style="font-weight:600; font-size:14px">Book:</div>
                        <input class="search-input input searchBook" placeholder="Enter barcode or name of book" v-model="searchBook" :disabled="!isInvoice"/>
                        <div style="position:relative; width:100%">
                            <div v-if="isShowSort && suggest?.length !== 0" class="text-start p-2 d-flex flex-column suggest">
                                <div class="d-flex flex-column" v-for="(item, index) in suggest" :key="index"
                                    @click="handleAddBook(item)" style="cursor:pointer; gap:8px">
                                    <p
                                        style="color: var(--neutral-darkest, #2B2B2B); font-size: 16px; font-weight: 600; line-height: 150%;">
                                        Book: {{ item?.book?.name || 'N/A' }}</p>
                                    <p
                                        style="color: var(--neutral-darkest, #ADADAD); font-size: 14px; font-weight: 400; line-height: 150%;">
                                        Price: {{ fixedCurrency(item?.book?.salesPrice * (1-item?.book?.discountValue)) || 'N/A' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;" />
                    <p class="text-start" style="font-weight:600; font-size:14px">Refund Detail:</p>
                    <div class="d-flex flex-row justify-content-between" style="padding:0 4px; gap:4px">
                        <p class="col text-start"
                            style="font-weight:600; max-width:180px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">
                            Book</p>
                        <p class="col text-center" style="font-weight:600; max-width:80px">Quantity</p>
                        <p class="col-2 text-end" style="font-weight:600;">Unit price</p>
                        <p class="col-2 text-end" style="font-weight:600">Cost</p>
                        <p style="width:30px">&nbsp;</p>
                    </div>
                    <div class="d-flex flex-column" style="gap:8px; max-height:500px; overflow:auto">
                        <div class="d-flex flex-row justify-content-between book-in-cart" v-for="(item, index) in bookInCart"
                            :key="index" style="padding:4px; gap:4px" v-motion-slide-left>
                            <p class="col text-start"
                                style="max-width:180px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">
                                {{ item?.book?.name }}</p>
                            <input class="col text-center add-scale" type="number" style="max-width:80px" :min="1"
                                :max="item?.quantity" v-model="quantity[index]" />
                            <p class="col-2 text-end">{{ fixedCurrency(item?.book?.salesPrice * (1 - item?.book?.discountValue)) }}</p>
                            <p class="col-2 text-end">{{ fixedCurrency(cost[index]) }}</p>
                            <div style="width:30px">
                                <i class="bi-trash delete-item" style="color:red; font-size:20px"
                                    @click="handleDeleteBook(index)"></i>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column" style="gap:8px; position:absolute; bottom:24px; width:calc(100% - 32px)">
                        <hr style="margin: 0; width:100%; border: 0.5px solid #E5E6E6; opacity: 1;" />
                        <div class="d-flex flex-row justify-content-between" style="gap:16px">
                            <p style="font-weight:600; font-size:14px">Total:</p>
                            <p style="font-weight:600; font-size:14px">{{fixedCurrency(total)}}</p>
                        </div>
                        <div class="d-flex justify-content-end" style="width:100%">
                            <button class="button-solid" style="width:120px" @click="handleRefund">Refund</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>