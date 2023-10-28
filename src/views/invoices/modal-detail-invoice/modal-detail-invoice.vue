<style scope src="./modal-detail-invoice.css"></style>
<script lang="ts" src="./modal-detail-invoice.ts"></script>

<template>
    <!-- <div ref="modal-detail-invoice" class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true"> -->
        <div class="modal-dialog modal-dialog-centered" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Detail Invoice</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="handleCancel"></button>
                </div>
                <div class="d-flex flex-column" style="gap:16px; margin:16px; overflow:auto" id="content-to-print">
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="d-flex flex-column" style="gap:8px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Invoice ID:</p>
                                <!-- <input class="input" :value="invoiceDetail?._id" style="height:30px" type="text" disabled/> -->
                                <Barcode :barcodeValue="invoiceDetail?._id"/>
                            </div>
                            <div class="input-field ">
                                <p class="text-start d-flex align-items-center"></p>
                                <!-- <input class="input" :value="invoiceDetail?._id" style="height:30px" type="text" disabled/> -->
                                <p>{{invoiceDetail?._id}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Create Date:</p>
                                <input class="input" :value="invoiceDetail?.createdAt?.slice(0,10)" type="text" disabled/>
                            </div>
                        </div>
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Updated Date:</p>
                                <input class="input" :value="invoiceDetail?.updatedAt?.slice(0,10)" type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Customer:</p>
                                <input class="input" :value="invoiceDetail?.customer?.name" type="text" disabled/>
                            </div>
                        </div>
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Cashier:</p>
                                <input class="input" :value="invoiceDetail?.employee?.name" type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Voucher:</p>
                                <input class="input" :value="invoiceDetail?.vouchers" type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field">
                                <p class="text-start d-flex align-items-start" style="height:100%; font-weight:600">Note:</p>
                                <textarea class="input" :value="invoiceDetail?.note" type="text" disabled></textarea>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 5% 10%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                    <p class="text-start text-title-1" style="font-weight:600; font-size:16px">List Book</p>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr class="text-start">
                                <th scope="col">Barcode</th>
                                <th scope="col">Name Book</th>
                                <th scope="col">Author</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row text-start" v-for="(item, index) in invoiceDetail?.invoiceDetails" :key="index">
                                <td>{{item?.book?.barcode}}</td>
                                <td>{{item?.book?.name}}</td>
                                <td>{{item?.book?.author}}</td>
                                <td>{{fixedCurrency(cost[index])}}</td>
                                <td>{{item?.quantity}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex flex-column" style="width:100%; gap:16px">
                        <div class="d-flex flex-row justify-content-between" style="gap:16px">
                            <p style="font-weight:600; font-size:14px">Subtotal:</p>
                            <p style="font-weight:600; font-size:14px">{{ fixedCurrency(subtotal) }}</p>
                        </div>
                        <div class="d-flex flex-row justify-content-between" style="gap:16px">
                            <p style="font-weight:600; font-size:14px">Voucher discount:</p>
                            <p style="font-weight:600; font-size:14px">{{fixedCurrency(voucherDiscount)}}</p>
                        </div>
                        <div class="d-flex flex-row justify-content-between" style="gap:16px">
                            <p style="font-weight:600; font-size:14px">Total:</p>
                            <p style="font-weight:600; font-size:14px">{{ fixedCurrency(total) }}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal" @click="handleCancel">Cancel</button>
                    <button type="button" class="button-solid" @click="print">Print Invoice</button>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>