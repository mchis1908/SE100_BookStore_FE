<style scoped src="./modal-add-voucher.css"></style>
<script lang="ts" src="./modal-add-voucher.ts"></script>

<template>
    <div class="modal fade" ref="add-new-voucher-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new voucher</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-2">
                        <label for="bookVoucherNameInput" class="form-label">Voucher Name</label>
                        <input v-model="voucher.name" type="text" class="form-control" id="bookVoucherNameInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Discount</label>
                        <input v-model="voucher.discountValue" type="text" class="form-control" id="bookDiscountInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookRankInput" class="form-label">Rank</label>
                        <input v-model="voucher.level" type="text" class="form-control" id="bookRankInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookExpirationDateInput" class="form-label">Expiration Date</label>
                        <input v-model="voucher.expirationDate" type="text" class="form-control" id="bookExpirationDateInput">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                    <button @click="handleAddNewVoucher" type="button" class="btn btn-primary btn-add">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>