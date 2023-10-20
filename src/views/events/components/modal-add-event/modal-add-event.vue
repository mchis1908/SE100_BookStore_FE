<style scoped src="./modal-add-event.css"></style>
<script lang="ts" src="./modal-add-event.ts"></script>

<template>
    <div class="modal fade" ref="add-new-event-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new event</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Event Name</label>
                        <input type="text" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Event Discount Value</label>
                        <input type="text" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Discounted Books</label>
                        <input type="text" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Start Day</label>
                        <input type="date" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">End Date</label>
                        <input type="date" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Event Images</label>
                        <input type="file" class="form-control file-input" id="bookDiscountInput">
                    </div>
                </div>
                    
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-add">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>